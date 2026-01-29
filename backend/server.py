from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List
import uuid
from datetime import datetime, timezone
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    company: str = ""
    message: str
    submitted_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = "new"

class ContactSubmissionCreate(BaseModel):
    name: str = Field(..., min_length=1)
    email: EmailStr
    company: str = ""
    message: str = Field(..., min_length=1)

class ContactSubmissionResponse(BaseModel):
    id: str
    message: str
    submitted_at: datetime

async def send_email_notification(contact_data: ContactSubmissionCreate):
    try:
        smtp_host = os.environ.get('SMTP_HOST')
        smtp_port = int(os.environ.get('SMTP_PORT', 587))
        smtp_user = os.environ.get('SMTP_USER')
        smtp_password = os.environ.get('SMTP_PASSWORD')
        notification_email = os.environ.get('NOTIFICATION_EMAIL')
        
        msg = MIMEMultipart()
        msg['From'] = smtp_user
        msg['To'] = notification_email
        msg['Subject'] = f"New Contact Form Submission - {contact_data.name}"
        
        body = f"""
You have received a new contact form submission:

Name: {contact_data.name}
Email: {contact_data.email}
Company: {contact_data.company if contact_data.company else 'Not provided'}
Message: 
{contact_data.message}

Submitted at: {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S UTC')}
        """
        
        msg.attach(MIMEText(body, 'plain'))
        
        server = smtplib.SMTP(smtp_host, smtp_port)
        server.starttls()
        server.login(smtp_user, smtp_password)
        server.send_message(msg)
        server.quit()
        
        logger.info(f"Email notification sent for contact from {contact_data.email}")
        return True
    except Exception as e:
        logger.error(f"Failed to send email notification: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to send email notification: {str(e)}")

@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks

@api_router.post("/contact", response_model=ContactSubmissionResponse, status_code=201)
async def create_contact_submission(contact: ContactSubmissionCreate):
    try:
        submission = ContactSubmission(**contact.model_dump())
        doc = submission.model_dump()
        doc['submitted_at'] = doc['submitted_at'].isoformat()
        await db.contact_submissions.insert_one(doc)
        await send_email_notification(contact)
        logger.info(f"Contact submission saved: {submission.id}")
        return ContactSubmissionResponse(
            id=submission.id,
            message="Thank you for reaching out. I'll get back to you soon.",
            submitted_at=submission.submitted_at
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error processing contact submission: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
