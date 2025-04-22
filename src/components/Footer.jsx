import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 text-sm text-gray-500 text-center">
        <p className="mb-2 sm:mb-0 ">
          © {new Date().getFullYear()} <span className=" text-amber-600">Pollify</span> — Built with ❤️ for the community.
        </p>
        {/* <div className="space-x-4">
          <Link to="/about" className="hover:text-amber-600 transition">About</Link>
          <Link to="/contact" className="hover:text-amber-600 transition">Contact</Link>
          <Link to="/privacy" className="hover:text-amber-600 transition">Privacy</Link>
        </div> */}
      </div>
    </footer>
  );
};
