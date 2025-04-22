import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AuthContext } from '@/context/AuthContext';

export const Header = () => {
  const user = localStorage.getItem('token');
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    // navigate('/login');
  };

  return (
    <header className="w-full bg-white shadow-md px-6 py-4 flex flex-wrap items-center justify-between fixed z-50">
      {/* App Name / Logo */}
      <Link to="/" className="text-2xl font-bold text-amber-500 tracking-tight">
        🗳️ Pollify
      </Link>

      {/* Navigation Buttons */}
      <nav className="flex items-center gap-2 mt-2 sm:mt-0 flex-wrap">
        <Link to="/">
          <Button
            variant="ghost"
            className="text-gray-700 bg-gray-100 transition-colors"
          >
            Home
          </Button>
        </Link>

        {user && (
          <Link to="/create-poll">
            <Button className="bg-amber-400 hover:bg-amber-300 text-black font-semibold transition">
              + Create Poll
            </Button>
          </Link>
        )}

        {user ? (
          <Button
            variant="outline"
            onClick={handleLogout}
            className="border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Logout
          </Button>
        ) : (
          <Link to="/login">
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Login
            </Button>
          </Link>
        )}
      </nav>
    </header>
  );
};
