import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent } from '../components/ui/card';
import { CheckCircle2, ExternalLink } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import axios from 'axios';
import mockData from '../mock';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API}/contact`, formData);
      
      toast({
        title: "Message Sent!",
        description: response.data.message,
      });

      setFormData({ name: '', email: '', company: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: error.response?.data?.detail || "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToContact = () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-light tracking-tight">Gail Villanueva</div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm hover:text-[#C9A672] transition-all hover:-translate-y-0.5">About</a>
            <a href="#services" className="text-sm hover:text-[#C9A672] transition-all hover:-translate-y-0.5">Services</a>
            <a href="#experience" className="text-sm hover:text-[#C9A672] transition-all hover:-translate-y-0.5">Experience</a>
            <a href="#contact" className="text-sm hover:text-[#C9A672] transition-all hover:-translate-y-0.5">Contact</a>
          </nav>
          <Button 
            onClick={() => window.open('https://zcal.co/ecommwizard', '_blank')}
            className="bg-black hover:bg-[#C9A672] text-white transition-all duration-300 hover:scale-105"
          >
            Schedule Meeting
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            <div className="flex-shrink-0">
              <img 
                src="https://customer-assets.emergentagent.com/job_sleek-portfolio-274/artifacts/djobbfit_Grey%20Minimalist%20Twitter%20Profile%20Picture%20%281%29.png"
                alt="Gail Villanueva"
                className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover shadow-lg"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-4">
                Gail Villanueva
              </h1>
              <h2 className="text-2xl md:text-3xl font-light text-gray-600 mb-6">
                E-Commerce Operations & Project Management Specialist
              </h2>
              <p className="text-lg text-gray-500 mb-8 max-w-2xl">
                Keeping your business organized, efficient, and stress-free.
              </p>
              <div className="flex gap-4 justify-center md:justify-start">
                <Button 
                  onClick={() => window.open('https://zcal.co/ecommwizard', '_blank')}
                  size="lg"
                  className="bg-[#C9A672] hover:bg-[#B8955E] text-white transition-all duration-300 hover:scale-105"
                >
                  Schedule a Call
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  onClick={scrollToContact}
                  size="lg"
                  variant="outline"
                  className="border-gray-300 hover:border-[#C9A672] hover:text-[#C9A672] transition-all duration-300"
                >
                  Get In Touch
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-12 text-center">
            About Me
          </h2>
          <div className="text-lg text-gray-700 leading-relaxed space-y-6">
            <p>
              Hi, I'm <span className="font-medium text-[#C9A672]">Gail (Abigail Jane Villanueva)</span> — a detail-oriented and reliable operations specialist who helps business owners manage their projects, teams, and daily workflows so they can focus on what truly matters: growth.
            </p>
            <p>
              I've spent the last few years assisting entrepreneurs and remote teams in staying organized, on schedule, and aligned with their goals. I handle the moving parts behind the scenes — from assigning tasks and monitoring progress to overseeing product listings, orders, and communication.
            </p>
            <p>
              If you need someone who's organized, trustworthy, and proactive in keeping your business running smoothly — that's what I do best. I take pride in my consistency, dedication, and care for every client I work with.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-16 text-center">
            What I Do
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <h3 className="text-2xl font-light mb-4 text-[#C9A672]">Project & Operations Management</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#C9A672] flex-shrink-0 mt-0.5" />
                    <span>Plan, assign, and track team tasks and deliverables</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#C9A672] flex-shrink-0 mt-0.5" />
                    <span>Maintain timelines and ensure smooth coordination</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#C9A672] flex-shrink-0 mt-0.5" />
                    <span>Organize workflows and create SOPs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#C9A672] flex-shrink-0 mt-0.5" />
                    <span>Provide regular updates and reports</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <h3 className="text-2xl font-light mb-4 text-[#C9A672]">E-Commerce Operations</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#C9A672] flex-shrink-0 mt-0.5" />
                    <span>Manage product listings and pricing accuracy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#C9A672] flex-shrink-0 mt-0.5" />
                    <span>Monitor sales performance and customer feedback</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#C9A672] flex-shrink-0 mt-0.5" />
                    <span>Handle order processing and tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#C9A672] flex-shrink-0 mt-0.5" />
                    <span>Review profit/loss reports for healthy performance</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <h3 className="text-2xl font-light mb-4 text-[#C9A672]">Client & Team Communication</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#C9A672] flex-shrink-0 mt-0.5" />
                    <span>Bridge between business owners and remote staff</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#C9A672] flex-shrink-0 mt-0.5" />
                    <span>Maintain transparent communication</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#C9A672] flex-shrink-0 mt-0.5" />
                    <span>Report project progress and highlight bottlenecks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#C9A672] flex-shrink-0 mt-0.5" />
                    <span>Foster accountability and clear expectations</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-16 text-center">
            Core Skills
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mockData.skills.map((skill, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 text-center"
              >
                <p className="text-gray-700">{skill}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-16 text-center">
            Professional Experience
          </h2>
          <div className="space-y-12">
            {mockData.experiences.map((exp, index) => (
              <Card key={index} className="border-none shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-8">
                  <h3 className="text-3xl font-light mb-2 text-[#C9A672]">{exp.title}</h3>
                  <p className="text-gray-500 mb-6">Industry: {exp.industry}</p>
                  <h4 className="font-medium mb-4">Key Contributions:</h4>
                  <ul className="space-y-3">
                    {exp.contributions.map((contribution, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-700">
                        <CheckCircle2 className="h-5 w-5 text-[#C9A672] flex-shrink-0 mt-0.5" />
                        <span>{contribution}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Work With Me Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-16 text-center">
            Why Work With Me
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {mockData.whyWorkWithMe.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <CheckCircle2 className="h-8 w-8 text-[#C9A672] flex-shrink-0" />
                <p className="text-lg text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4 text-center">
            Let's Connect
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Ready to streamline your operations? Fill out the form below and I'll get back to you shortly.
          </p>
          
          <Card className="border-none shadow-lg">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@company.com"
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2">
                    Company / Business Name
                  </label>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Your Company"
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project or how I can help..."
                    rows={5}
                    className="w-full"
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={isSubmitting}
                  className="w-full bg-[#C9A672] hover:bg-[#B8955E] text-white transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <p className="text-lg font-light mb-2">Gail Villanueva</p>
              <p className="text-sm text-gray-400">
                Reliable • Organized • Results-Driven
              </p>
            </div>
            <div className="flex flex-col items-center md:items-end gap-2">
              <p className="text-sm text-gray-400">Based in: Remote — Available Worldwide</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
