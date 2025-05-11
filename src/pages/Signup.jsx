import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Message } from '@/utils/Message';
import { Loader } from 'lucide-react';

export const Signup = () => {
  const { signup } = useContext(AuthContext);
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ fullName: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onFinish = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signup(form);
      setResponse(result);
      if (result.status === 201) {
        setTimeout(() => navigate('/login'), 1500);
      }
    } catch (error) {
      setResponse(error.response);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 mt-27">
        {response && (
          <div>
            <Message response={response} />
          </div>
        )}

        <Card className="rounded-3xl shadow-lg border border-gray-200 bg-white">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-amber-600">
              🎉 Join the Pollverse
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              Be part of the conversation. Create, vote, connect.
            </p>
          </CardHeader>

          <CardContent className="">
            <form onSubmit={onFinish} className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="fullName" className="text-gray-700">Full Name</Label>
                <input
                  name="fullName"
                  placeholder="John Doe"
                  value={form.fullName}
                  onChange={handleChange}
                  className="mt-1 border border-gray-300 rounded-lg p-3 w-full
                  focus:outline-none"
                  required
                />
              </div>

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

              {loading ? <Loader className="animate-spin w-full" /> :
                <Button
                  type="submit"
                  className="w-full bg-amber-700 text-white hover:bg-amber-600 font-semibold py-2.5 rounded-xl text-md transition"
                >
                  🚀 Create Account
                </Button>
              }


              <p className="text-sm text-center text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-amber-500 font-medium hover:underline">
                  Log in
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
