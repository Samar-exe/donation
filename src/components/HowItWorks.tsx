import React from 'react';

const Step = ({ number, title, description }) => (
  <div className="bg-white rounded-lg p-6 text-center relative">
    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-emerald-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
      {number}
    </div>
    <div className="h-20 flex items-center justify-center mb-4">
      <svg className="w-16 h-16 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={
          number === 1 ? "M4 6h16M4 12h16m-7 6h7" :
          number === 2 ? "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" :
          number === 3 ? "M13 10V3L4 14h7v7l9-11h-7z" :
          "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        }></path>
      </svg>
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const HowItWorks = () => {
  const steps = [
    {
      title: "Select a Service",
      description: "Choose from our wide range of Islamic services based on your needs."
    },
    {
      title: "Browse Providers",
      description: "Explore verified providers and projects that meet your requirements."
    },
    {
      title: "Contribute or Engage",
      description: "Donate, invest, or sign up for the services that interest you."
    },
    {
      title: "Track Progress",
      description: "Get personalized updates and track your contributions in real-time."
    }
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Our platform makes it easy to access all Islamic services in just a few simple steps.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Step key={index} number={index + 1} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;