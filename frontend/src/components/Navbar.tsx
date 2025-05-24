
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/90 backdrop-blur-md border-b border-[#00d4ff]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-[#00d4ff] to-[#4fa8da] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#00d4ff] to-[#4fa8da] bg-clip-text text-transparent">
              SuiMate
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="text-gray-300 hover:text-[#00d4ff] transition-colors">
              How it Works
            </a>
            <a href="#features" className="text-gray-300 hover:text-[#00d4ff] transition-colors">
              Features
            </a>
            <a href="#faq" className="text-gray-300 hover:text-[#00d4ff] transition-colors">
              FAQ
            </a>
            <Link 
              to="/chat"
              className="px-6 py-2 bg-gradient-to-r from-[#00d4ff] to-[#4fa8da] rounded-lg font-semibold hover:shadow-lg hover:shadow-[#00d4ff]/25 transform hover:scale-105 transition-all duration-300"
            >
              Launch App
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-[#00d4ff] transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-[#1a1a2e]/90 backdrop-blur-md rounded-lg mt-2">
              <a href="#how-it-works" className="block px-3 py-2 text-gray-300 hover:text-[#00d4ff] transition-colors">
                How it Works
              </a>
              <a href="#features" className="block px-3 py-2 text-gray-300 hover:text-[#00d4ff] transition-colors">
                Features
              </a>
              <a href="#faq" className="block px-3 py-2 text-gray-300 hover:text-[#00d4ff] transition-colors">
                FAQ
              </a>
              <Link 
                to="/chat"
                className="block px-3 py-2 bg-gradient-to-r from-[#00d4ff] to-[#4fa8da] rounded-lg font-semibold text-center mx-3 mt-2"
              >
                Launch App
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
