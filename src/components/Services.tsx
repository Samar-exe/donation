import React from 'react';
import { Heart, TrendingUp, Home, Users, Coffee, ChevronRight, Fuel as Mosque } from 'lucide-react';

const ServiceCard = ({ icon: Icon, title, description, link }) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 border-t-4 border-emerald-600">
    <div className="bg-emerald-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
      <Icon className="h-7 w-7 text-emerald-600" />
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    {link ? (
      <a href={link} className="text-emerald-600 font-medium flex items-center hover:text-emerald-700">
        Explore More <ChevronRight className="ml-1 h-4 w-4" />
      </a>
    ) : (
      <span className="text-gray-400 font-medium flex items-center cursor-not-allowed">
        Coming Soon <ChevronRight className="ml-1 h-4 w-4" />
      </span>
    )}
  </div>
);

const Services = () => {
  const services = [
    {
      icon: Heart,
      title: "Donation & Charity",
      description: "Support mosques, educational initiatives, and humanitarian causes with transparent tracking.",
      link: "/services/donation"
    },
    {
      icon: TrendingUp,
      title: "Halal Investment & Finance",
      description: "Grow your wealth ethically with Shariah-compliant investment opportunities and financial planning.",
      link: null
    },
    {
      icon: Home,
      title: "Halal Properties",
      description: "Find and finance properties through Islamic mortgage alternatives and Shariah-compliant contracts.",
      link: null
    },
    {
      icon: Users,
      title: "Halal Marriage & Family",
      description: "Connect with potential spouses, access marriage services, and find family support resources.",
      link: null
    },
    {
      icon: Coffee,
      title: "Halal Food & Dining",
      description: "Discover certified halal restaurants, food products, and catering services in your area.",
      link: null
    },
    {
      icon: Mosque,
      title: "Islamic Education",
      description: "Access quality Islamic courses, Quran learning programs, and educational resources for all ages.",
      link: null
    }
  ];

  return (
    <section className="py-16 container mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-3">Our Services</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">Discover our comprehensive range of Islamic services designed to meet all your needs in one place.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </section>
  );
};

export default Services;