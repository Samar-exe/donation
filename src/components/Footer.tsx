import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Fuel as Mosque } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <Mosque className="h-8 w-8 text-emerald-400" />
              <span className="ml-2 text-xl font-bold">IslamicHub</span>
            </div>
            <p className="text-gray-400 mb-4">Your comprehensive platform for all Islamic services, from donations to halal investments and beyond.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Services</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Contact</a></li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Donation & Charity</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Halal Investment</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Halal Properties</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Marriage & Family</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Food & Dining</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Islamic Education</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li>1234 Islamic Center Ave</li>
              <li>Dubai, UAE 12345</li>
              <li>Email: info@islamichub.com</li>
              <li>Phone: +971 4 123 4567</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} IslamicHub. All Rights Reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition duration-300">Terms & Conditions</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition duration-300">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition duration-300">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;