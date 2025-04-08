import React from 'react';
import { Shield } from 'lucide-react';

const CertificationCard = ({ title }) => (
  <div className="bg-white rounded-xl shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
    <div className="p-6">
      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-emerald-50 mx-auto mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">{title}</h3>
      <p className="text-gray-600 text-center">Official certification ensuring proper management of Islamic endowments</p>
    </div>
  </div>
);

const Trust = () => {
  const certifications = [
    "Waqf Board",
    "Islamic Finance Authority",
    "Halal Certification",
    "Shariah Council"
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-6 text-center">
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-3">Fully Verified, 100% Islamic-Compliant</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">We partner with official bodies & scholars to ensure authenticity & trust.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {certifications.map((cert, index) => (
            <CertificationCard key={index} title={cert} />
          ))}
        </div>
          
        <div className="flex justify-center">
          <div className="flex items-center bg-emerald-50 p-4 rounded-lg max-w-2xl">
            <Shield className="h-10 w-10 text-emerald-600 mr-4 flex-shrink-0" />
            <p className="text-gray-700 text-left">All our services and providers undergo rigorous verification to ensure they meet Islamic standards and provide the highest quality experience.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trust;