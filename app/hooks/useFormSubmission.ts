import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface FormSubmissionOptions {
  apiUrl: string;
  successRoute: string;
  successMessage: string;
  onError?: (error: string) => void;
  method?: string
}

export const useFormSubmission = ({
  apiUrl, 
  successRoute, 
  successMessage,
  method,
    
  onError
}: FormSubmissionOptions) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: Record<string, string>) => {
    setLoading(true);
    try {
      const res = await fetch(apiUrl, {
        method: method ,
        headers: { 
          "Content-Type": "application/json",
         
        },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();

      if (res.ok) {
        toast.success(successMessage);
        router.push(successRoute);
        return responseData;
      } else {
        const errorMessage = responseData.message || "Operation failed";
        toast.error(errorMessage);
        onError?.(errorMessage);
      }
    } catch (error) {
      console.error("Submission error:", error);
      const errorMessage = "An unexpected error occurred";
      toast.error(errorMessage);
      onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleSubmit };
};