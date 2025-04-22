import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
        // setTimeout(() => navigate('/dashboard'), 1500);
      }
    } catch (error) {
      setResponse(error.response);
    }
  };

  return (
    <>
    <div className="flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 mt-39">
        {response && (
          <div className="mb-4">
            <Message response={response} />
          </div>
        )}

        <Card className="rounded-3xl shadow-lg border border-gray-200 bg-white ">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-amber-600">
              🔐 Welcome Back!
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              Log in to join the community and cast your vote 🗳️
            </p>
          </CardHeader>

          <CardContent className="">
            <form onSubmit={onFinish} className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className="mt-1 border border-gray-300 rounded-lg p-3 w-full
                  focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="password" className="text-gray-700">Password</Label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  className="mt-1 border border-gray-300 rounded-lg p-3 w-full
                  focus:outline-none"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-amber-700 text-white hover:bg-amber-600 font-semibold py-2.5 rounded-xl text-md transition"
              >
                Log In
              </Button>

              <p className="text-sm text-center text-gray-600">
                Don’t have an account?{' '}
                <Link to="/signup" className="text-amber-500 font-medium hover:underline">
                  Sign up here
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  );
};
