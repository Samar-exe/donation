import React from 'react';
import { ArrowRight } from 'lucide-react';

const FeaturedService = () => {
  return (
    <section className="py-16 container mx-auto px-6">
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 rounded-xl overflow-hidden shadow-xl">
        <div className="md:flex">
          <div className="md:w-1/2 p-8 md:p-12 text-white">
            <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-sm font-medium mb-4">Featured</div>
            <h2 className="text-3xl font-bold mb-4">Mosque Donation Platform</h2>
            <p className="mb-6 text-white/90 text-lg">Track your donations in real-time, sponsor urgent causes, and contribute to mosque development projects worldwide.</p>
            <p className="mb-8 text-white/80">Our transparent donation tracking system ensures you can see exactly how your contributions are making an impact.</p>
            <button className="bg-white text-emerald-700 hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition duration-300 flex items-center">
              View Donations
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
          <div className="md:w-1/2 relative min-h-[300px]">
            <img 
              src="https://images.unsplash.com/photo-1564121211835-e88c852648ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
              alt="Mosque" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedService;