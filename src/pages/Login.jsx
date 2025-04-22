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
        setTimeout(() => navigate('/dashboard'), 1500);
      }
    } catch (error) {
      setResponse(error.response);
    }
  };

  return (
    <div className="flex items-center justify-center mt-20 px-4">
      <div className="w-full max-w-md space-y-4">
        {response && (
          <div className="mb-4">
            <Message response={response} />
          </div>
        )}

        <Card className="rounded-2xl shadow-xl border border-gray-200 bg-white">
          <CardHeader className="text-center px-6 pt-6">
            <CardTitle className="text-3xl font-semibold text-gray-800">
              Welcome Back
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              Log in to access your account
            </p>
          </CardHeader>

          <CardContent className="">
            <form onSubmit={onFinish} className="space-y-2">

              <div className="space-y-1">
                <Label htmlFor="email">Email Address</Label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className="mt-1 border border-gray-300 rounded-md p-2 w-full
    focus:outline-none focus:ring-0 focus:border-gray-400 focus-visible:outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  className="mt-1 border border-gray-300 rounded-md p-2 w-full
    focus:outline-none focus:ring-0 focus:border-gray-400 focus-visible:outline-none"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gray-500 text-black hover:bg-gray-400 font-medium text-md py-2 rounded-xl transition"
              >
                 🔐 Login
              </Button>

              <p className="text-sm text-center text-gray-600">
              Don’t have an account?{' '}
                <Link to="/signup" className="text-gray-500 hover:underline font-medium">
                Sign up
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
