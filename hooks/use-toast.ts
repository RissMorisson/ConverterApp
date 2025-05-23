import { toast } from "sonner";

export function useToast() {
  return {
    toast: (options: { title: string; description?: string }) => {
      toast(options.title, { description: options.description });
    },
  };
}
