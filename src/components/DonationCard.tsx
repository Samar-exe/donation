import React, { useState } from 'react';
import { ArrowUpRight, X, Users, DollarSign, Quote } from 'lucide-react';

interface DonationCardProps {
  title: string;
  description: string;
  image: string;
  raisedAmount: number;
  goalAmount: number;
  donorsCount: number;
  daysLeft: number;
  initials?: string;
  sadaqaQuote?: string;
}

const DonationCard = ({
  title,
  description,
  image,
  raisedAmount,
  goalAmount,
  donorsCount,
  daysLeft,
  initials = 'DI',
  sadaqaQuote = "The example of those who spend in the way of Allah is like a seed that grows seven spikes; in each spike is a hundred grains."
}: DonationCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const progress = (raisedAmount / goalAmount) * 100;
  const avgDonation = donorsCount > 0 ? raisedAmount / donorsCount : 0;
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <>
      {/* Minimal Card */}
      <div 
        className="bg-white rounded-lg shadow-md w-64 h-64 p-6 relative cursor-pointer hover:shadow-lg transition-shadow duration-300"
        onClick={toggleExpand}
      >
        <div className="absolute top-4 right-4">
          <ArrowUpRight className="w-5 h-5 text-emerald-600" />
        </div>
        
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-lg mb-4">
              {initials}
            </div>
            <h3 className="text-lg font-bold text-gray-800 line-clamp-3">{title}</h3>
          </div>
          
          <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden mt-4">
            <div 
              className="h-full bg-emerald-500 rounded-full"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Expanded View */}
      {isExpanded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={toggleExpand}></div>
          
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden z-10 transform transition-all duration-300 ease-in animate-in fade-in slide-in-from-bottom-4">
            <div className="relative">
              <img src={image} alt={title} className="w-full h-48 object-cover" />
              <button 
                onClick={toggleExpand}
                className="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:text-gray-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
              <p className="text-gray-600 mb-6">{description}</p>
              
              <div className="mb-6">
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 rounded-full transition-all duration-1000 ease-in-out"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
              </div>
              
              <div className="flex justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-emerald-600" />
                  <div>
                    <p className="text-sm text-gray-500">Donors</p>
                    <p className="font-bold text-gray-800">{donorsCount}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-emerald-600" />
                  <div>
                    <p className="text-sm text-gray-500">Avg Donation</p>
                    <p className="font-bold text-gray-800">${Math.round(avgDonation).toLocaleString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-6 bg-emerald-50 p-4 rounded-lg border-l-4 border-emerald-500">
                <div className="flex">
                  <Quote className="h-5 w-5 text-emerald-600 mr-2 shrink-0 mt-1" />
                  <p className="text-emerald-700 italic">{sadaqaQuote}</p>
                </div>
              </div>
              
              <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-4 rounded-lg font-medium transition duration-300 flex items-center justify-center group">
                Donate Now
                <ArrowUpRight className="ml-2 h-5 w-5 transform transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DonationCard;