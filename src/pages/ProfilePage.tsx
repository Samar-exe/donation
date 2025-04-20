import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  History, 
  Receipt, 
  UserCog, 
  Edit3,
  Clock,
  LayoutDashboard
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('history');
  const { user, updateProfile, loading, error } = useAuth();
  
  // Form state
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [validationError, setValidationError] = useState('');
  
  // Update form values when user data changes
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [user]);
  
  const defaultUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
    lastDonation: '20 min ago',
    sawabPoints: 2000,
  };

  // Use user data from auth context if available, otherwise use default
  const userData = {
    name: user?.name || defaultUser.name,
    email: user?.email || defaultUser.email,
    avatar: user?.profilePicture || defaultUser.avatar,
    lastDonation: defaultUser.lastDonation,
    sawabPoints: defaultUser.sawabPoints,
  };

  const validateForm = () => {
    setValidationError('');
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidationError('Please enter a valid email address');
      return false;
    }
    
    // Name validation - just check if it's not empty
    if (!name.trim()) {
      setValidationError('Name cannot be empty');
      return false;
    }
    
    return true;
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateSuccess(false);
    
    // Validate form before submitting
    if (!validateForm()) {
      return;
    }
    
    try {
      await updateProfile({ name, email });
      setUpdateSuccess(true);
      // Clear success message after 3 seconds
      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to update profile:', err);
      // Error is handled in the auth context
    }
  };

  const navigationItems = [
    { id: 'history', label: 'Donation History', icon: History },
    { id: 'receipts', label: 'Annual Receipts', icon: Receipt },
    { id: 'edit', label: 'Edit Profile', icon: UserCog },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'history':
        return (
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                  <History className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-medium">Donated to Mosque Construction</h4>
                  <p className="text-sm text-gray-500">20 minutes ago</p>
                </div>
                <div className="ml-auto">
                  <span className="font-medium text-emerald-600">$100</span>
                </div>
              </div>
            ))}
          </div>
        );
      case 'receipts':
        return (
          <div className="space-y-4">
            {[2024, 2023, 2022].map((year) => (
              <div key={year} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                    <Receipt className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-medium">Annual Receipt {year}</h4>
                    <p className="text-sm text-gray-500">Total donations: $1,234</p>
                  </div>
                </div>
                <button className="text-emerald-600 hover:text-emerald-700 font-medium">
                  Download
                </button>
              </div>
            ))}
          </div>
        );
      case 'edit':
        return (
          <form onSubmit={handleProfileUpdate} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-100 text-red-700 border border-red-400 rounded">
                {error}
              </div>
            )}
            
            {validationError && (
              <div className="p-3 bg-red-100 text-red-700 border border-red-400 rounded">
                {validationError}
              </div>
            )}
            
            {updateSuccess && (
              <div className="p-3 bg-green-100 text-green-700 border border-green-400 rounded transition-opacity duration-500">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Profile updated successfully!
                </div>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                disabled={loading}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                disabled={loading}
                required
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className={`flex items-center justify-center w-full md:w-auto bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : 'Save Changes'}
            </button>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6">
              {/* Profile Info */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <img 
                    src={userData.avatar} 
                    alt={userData.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4"
                  />
                  <button className="absolute bottom-0 right-0 bg-emerald-100 p-2 rounded-full text-emerald-600 hover:bg-emerald-200 transition-colors">
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
                <h2 className="text-xl font-bold text-gray-900">{userData.name}</h2>
                <p className="text-gray-500 text-sm">{userData.email}</p>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-2">
                  <Clock className="w-4 h-4" />
                  <span>Last donated {userData.lastDonation}</span>
                </div>
                <div className="mt-4 py-2 px-4 bg-emerald-50 rounded-lg">
                  <p className="text-sm text-emerald-800">Sawab Points</p>
                  <p className="text-2xl font-bold text-emerald-600">{userData.sawabPoints}</p>
                </div>
              </div>

              {/* Fundraiser CTA */}
              <Link
                to="/fundraiser/apply"
                className="block w-full bg-emerald-600 text-white text-center py-2 px-4 rounded-lg font-medium hover:bg-emerald-700 transition-colors mb-6"
              >
                Be a Fundraiser
              </Link>

              {/* Navigation */}
              <nav className="space-y-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-colors
                        ${activeTab === item.id 
                          ? 'bg-emerald-50 text-emerald-700' 
                          : 'text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </button>
                  );
                })}
              </nav>

              {/* Admin Dashboard Link */}
              <div className="mt-auto pt-6 border-t border-gray-200">
                <Link
                  to="/admin"
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-colors text-gray-700 hover:bg-gray-50"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  Admin Dashboard
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">
                {navigationItems.find(item => item.id === activeTab)?.label}
              </h2>
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 