import React from 'react';

const TestimonialCard = ({ image, name, location, text }) => (
  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
    <div className="flex items-center mb-4">
      <img 
        src={image}
        alt={name} 
        className="w-14 h-14 rounded-full object-cover mr-4"
      />
      <div>
        <h4 className="font-semibold">{name}</h4>
        <p className="text-gray-600 text-sm">{location}</p>
      </div>
    </div>
    <p className="text-gray-700 italic">{text}</p>
    <div className="mt-4 flex text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      ))}
    </div>
  </div>
);

const Testimonials = () => {
  const testimonials = [
    {
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
      name: "Ahmed Hassan",
      location: "Dubai, UAE",
      text: "I found a perfect halal investment plan, and also donated to a mosque project. The platform made it incredibly easy to manage both activities in one place."
    },
    {
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
      name: "Fatima Khan",
      location: "London, UK",
      text: "My family's wedding planning was made easy through the aggregator's providers. From halal catering to Islamic marriage services, everything was in one place."
    }
  ];

  return (
    <section className="py-16 container mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-3">What Our Users Say</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">Hear from our community about their experiences with our platform.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;