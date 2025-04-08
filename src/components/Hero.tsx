import React from 'react';
import { ChevronRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-emerald-800 to-emerald-600 text-white py-20 md:py-32">
      <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1519817650390-64a93db51149?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-emerald-900 opacity-60"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">All Your Islamic Services Under One Roof</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">From Donations to Halal Investments, We've Got You Covered</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-white text-emerald-800 hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition duration-300 flex items-center justify-center">
              Explore Services
              <ChevronRight className="ml-2 h-5 w-5" />
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-white/10 px-6 py-3 rounded-md font-medium transition duration-300">
              Join Now
            </button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
    </section>
  );
};

export default Hero;