import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import HowItWorks from '../components/HowItWorks';
import FeaturedService from '../components/FeaturedService';
import Trust from '../components/Trust';
import Testimonials from '../components/Testimonials';
import CallToAction from '../components/CallToAction';

const HomePage = () => {
  return (
    <>
      <Hero />
      <Services />
      <HowItWorks />
      <FeaturedService />
      <Trust />
      <Testimonials />
      <CallToAction />
    </>
  );
};

export default HomePage;