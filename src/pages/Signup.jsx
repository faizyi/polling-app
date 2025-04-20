import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Message } from '@/utils/Message';

export const Signup = () => {
  const { signup } = useContext(AuthContext);
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: '', email: '', password: '' });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const onFinish = async (e) => {
    e.preventDefault();
    const data = {
      fullName: form.fullName,
      email: form.email,
      password: form.password,
    };
  
    try {
      const result = await signup(data);
      setResponse(result);
      if (result.status === 201) {
        setTimeout(() => navigate('/login'), 1500);
      }
    } catch (error) {
      setResponse(error.response);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen p-4 flex-col">
         {response && <div className="mb-4 w-full max-w-md"><Message response={response} /></div>}
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Create an Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onFinish} className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                type="text"
                name="fullName"
                placeholder="John Doe"
                value={form.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-amber-300">Sign Up</Button>
            <p className="text-sm text-center">
              Already have an account? <Link to="/login" className="underline">Login</Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
