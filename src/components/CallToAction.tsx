import React from 'react';

const CallToAction = () => {
  return (
    <section className="py-16 bg-emerald-700 text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Explore the Best of Islamic Services?</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-emerald-700 hover:bg-gray-100 px-8 py-3 rounded-md font-medium transition duration-300">
            Join the Community
          </button>
          <button className="bg-transparent border-2 border-white hover:bg-white/10 px-8 py-3 rounded-md font-medium transition duration-300">
            Explore All Services
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;