import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Message } from '@/utils/Message';

export const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [response, setResponse] = useState(null);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const onFinish = async (e) => {
    e.preventDefault();
    try {
      const result = await login(form);
      setResponse(result);
      if (result.status === 200) {
        setTimeout(() => navigate('/dashboard'), 1500); // or wherever you want to go
      }
    } catch (error) {
      setResponse(error.response);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 flex-col">
      {response && (
        <div className="mb-4 w-full max-w-md">
          <Message response={response} />
        </div>
      )}

      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Login to Your Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onFinish} className="space-y-4">
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
            <Button type="submit" className="w-full bg-amber-300">Login</Button>
            <p className="text-sm text-center">
              Don't have an account? <Link to="/signup" className="underline">Sign up</Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
