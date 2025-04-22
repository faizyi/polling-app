import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, AlertTriangle, X } from 'lucide-react';

export const Message = ({ response }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!response) return;
    setShow(true);
    const timer = setTimeout(() => setShow(false), 3000);
    return () => clearTimeout(timer);
  }, [response]);

  const isSuccess = response.status === 200 || response.status === 201;
  const message = response?.data?.message || response?.data?.error || response?.message || "Something went wrong";

  if (!show) return null;

  return (
    <Alert
      className={`relative flex items-start gap-3 p-4 rounded-xl border text-sm transition-all duration-500 transform
        ${isSuccess
          ? 'bg-green-50 text-green-800 border-green-200'
          : 'bg-red-50 text-red-800 border-red-200'
        }`}
    >
      <div className="pt-0.5">
        {isSuccess ? (
          <CheckCircle className="h-5 w-5 text-green-600" />
        ) : (
          <AlertTriangle className="h-5 w-5 text-red-600" />
        )}
      </div>

      <div className="flex-1 space-y-0.5">
        <AlertTitle className="font-semibold">
          {isSuccess ? 'Success' : 'Error'}
        </AlertTitle>
        <AlertDescription className="text-sm text-black ">
          {message}
        </AlertDescription>
      </div>
    </Alert>
  );
};
