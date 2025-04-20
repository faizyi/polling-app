import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export const PublicRoute = ({ children }) => {
    const user = localStorage.getItem('token');
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);
    return user ? null : <>{children}</>;
}
