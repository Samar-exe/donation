import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown, Fuel as Mosque, User, Settings, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  console.log('User profile picture:', user?.profilePicture);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Mosque className="h-8 w-8 text-emerald-600" />
              <span className="ml-2 text-xl font-bold text-emerald-800">IslamicHub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Services Dropdown */}
            <div className="relative group">
              <button 
                className="flex items-center text-gray-700 hover:text-emerald-600 transition duration-300"
                onClick={() => setIsServicesOpen(!isServicesOpen)}
              >
                Services
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {/* Dropdown Menu */}
              <div className={`absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-300 ${isServicesOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <Link to="/services/donation" className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600" role="menuitem">Donation & Charity</Link>
                  <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600" role="menuitem">Halal Investment</Link>
                  <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600" role="menuitem">Halal Properties</Link>
                  <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600" role="menuitem">Marriage & Family</Link>
                  <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600" role="menuitem">Food & Dining</Link>
                  <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600" role="menuitem">Islamic Education</Link>
                </div>
              </div>
            </div>
            
            <Link to="#" className="text-gray-700 hover:text-emerald-600 transition duration-300">How It Works</Link>
            <Link to="#" className="text-gray-700 hover:text-emerald-600 transition duration-300">About Us</Link>
            <Link to="#" className="text-gray-700 hover:text-emerald-600 transition duration-300">Blog</Link>
            <Link to="#" className="text-gray-700 hover:text-emerald-600 transition duration-300">Contact</Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative" ref={profileRef}>
                <div 
                  className="flex items-center cursor-pointer"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border border-gray-300">
                    {user.profilePicture ? (
                      <img 
                        src={user.profilePicture} 
                        alt={user.name || user.email} 
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User className="h-5 w-5 text-gray-600" />
                    )}
                  </div>
                  <span className="ml-2 text-gray-700">{user.name || user.email}</span>
                  <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
                </div>
                
                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-4 py-2 text-xs text-gray-500">
                      Signed in as<br />
                      <span className="font-medium text-gray-900">{user.email}</span>
                    </div>
                    <div className="border-t border-gray-100"></div>
                    
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Your Profile
                    </Link>
                    
                    <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                    
                    <div className="border-t border-gray-100"></div>
                    
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="text-emerald-600 hover:text-emerald-700 font-medium transition duration-300">Login</Link>
                <Link to="/register" className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md font-medium transition duration-300">Sign Up</Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-emerald-600 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-md">
          <Link to="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-md">Services</Link>
          <Link to="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-md">How It Works</Link>
          <Link to="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-md">About Us</Link>
          <Link to="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-md">Blog</Link>
          <Link to="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-md">Contact</Link>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {user ? (
              <>
                <div className="flex items-center px-3 py-2">
                  <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border border-gray-300">
                    {user.profilePicture ? (
                      <img 
                        src={user.profilePicture} 
                        alt={user.name || user.email}
                        className="h-full w-full object-cover" 
                      />
                    ) : (
                      <User className="h-5 w-5 text-gray-600" />
                    )}
                  </div>
                  <span className="ml-2 text-gray-700">{user.name || user.email}</span>
                </div>
                <div className="mt-3 space-y-1">
                  <Link to="/profile" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md">Your Profile</Link>
                  <Link to="/settings" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md">Settings</Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-gray-100 rounded-md"
                  >
                    Sign out
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 text-base font-medium text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-md">Login</Link>
                <Link to="/register" className="block px-3 py-2 mt-1 text-base font-medium bg-emerald-600 text-white hover:bg-emerald-700 rounded-md">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;