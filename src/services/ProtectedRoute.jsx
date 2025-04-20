import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const user = localStorage.getItem('token');
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  return user ? <>{children}</> : null
}
