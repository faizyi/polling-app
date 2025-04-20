import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Signup = () => {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: '', email: '', password: '' });
  const [snackbar, setSnackbar] = useState({ open: false, severity: 'success', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const onFinish = async (e) => {
    e.preventDefault();
    const data = {
      fullName: form.fullName,
      email: form.email,
      password: form.password,
    };

    const result = await signup(data);

    if (result.status === 201) {
      setSnackbar({ open: true, severity: 'success', message: result.data.message });
      setTimeout(() => navigate('/login'), 1500);
    } else {
      setSnackbar({ open: true, severity: 'error', message: result.error });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">

    </div>
  );
};
