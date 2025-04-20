import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import React, { useState, useEffect } from 'react';

export const Message = ({ response }) => {
  const [show, setShow] = useState(false);
  console.log(response);
  
  useEffect(() => {
    if (!response) return;
    setShow(true);
    const timer = setTimeout(() => setShow(false), 3000);
    return () => clearTimeout(timer);
  }, [response]);

  const isSuccess = response.status === 200 || response.status === 201;

  return (
<Alert
  className={`p-3 rounded-lg border transition-all duration-500 ease-in-out transform
    ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
    ${isSuccess ? "bg-green-100 text-green-700 border-green-300" : "bg-red-100 text-red-700 border-red-300"}
  `}
>
      <AlertTitle className="font-bold">{isSuccess ? "Success" : "Error"}</AlertTitle>
      <AlertDescription>
        {response.data?.message || response.data?.error || response.message || "An unexpected error occurred"}
      </AlertDescription>
    </Alert>
  );
};
