import { toast } from "sonner";

export const useToast = () => {
  return {
    toast: ({ title, description, variant }) => {
      if (variant === "destructive") {
        toast.error(title, {
          description: description,
        });
      } else {
        toast.success(title, {
          description: description,
        });
      }
    },
  };
};
