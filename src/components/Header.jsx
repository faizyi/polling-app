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
    <header className="w-full bg-white shadow-sm px-6 py-3 flex items-center justify-between">
      {/* App Name */}
      <Link to="/" className="text-xl font-bold text-amber-500 tracking-wide">
        🗳️ Polling App
      </Link>

      {/* Navigation */}
      {user ? (
        <nav className="space-x-2">
        <Link to="/">
          <Button variant="outline" className={'mr-2'}>Dashboard</Button>
        </Link> 
        <Link to="/create-poll">
          <Button variant="outline" className={'mr-2'}>Create Poll</Button>
        </Link>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </nav>
      ) : (
        <nav className="space-x-2">
          <Link to="/">
            <Button variant="outline" className={'mr-2'}>Dashboard</Button>
          </Link>
          <Link to="/login">
            <Button variant="outline">Login</Button>
          </Link>
        </nav>
      )
    }
    </header>
  );
};
