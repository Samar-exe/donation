import React from 'react';
import { ArrowRight } from 'lucide-react';

const SpecificDonations = () => {
  return (
    <div className="py-16 px-10">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Specific Donations</h2>
      <div className="grid grid-cols-12 gap-6">
        {/* Featured Large Card */}
        <div className="col-span-12 md:col-span-6 lg:col-span-7">
          <div className="bg-white rounded-lg shadow-md p-6 h-full border border-gray-200 hover:border-emerald-500 transition-colors cursor-pointer">
            <h3 className="text-xl font-semibold mb-4">Masjid Construction Project</h3>
            <p className="text-gray-600">Support the construction of a new mosque that will serve over 1,000 worshippers.</p>
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>Progress</span>
                <span>75%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="w-3/4 h-full bg-emerald-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Side Cards */}
        <div className="col-span-12 md:col-span-6 lg:col-span-5 grid grid-rows-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:border-emerald-500 transition-colors cursor-pointer">
            <h3 className="text-lg font-semibold mb-2">Emergency Relief</h3>
            <p className="text-gray-600 text-sm">Provide immediate assistance to those affected by natural disasters.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:border-emerald-500 transition-colors cursor-pointer">
            <h3 className="text-lg font-semibold mb-2">Education Support</h3>
            <p className="text-gray-600 text-sm">Help provide quality Islamic education to underprivileged children.</p>
          </div>
        </div>

        {/* Bottom Row Cards */}
        <div className="col-span-12 md:col-span-4">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:border-emerald-500 transition-colors cursor-pointer">
            <h3 className="text-lg font-semibold mb-2">Food Bank</h3>
            <p className="text-gray-600 text-sm">Support our local food bank initiatives.</p>
          </div>
        </div>
        <div className="col-span-12 md:col-span-4">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:border-emerald-500 transition-colors cursor-pointer">
            <h3 className="text-lg font-semibold mb-2">Orphan Care</h3>
            <p className="text-gray-600 text-sm">Help provide care and support for orphans.</p>
          </div>
        </div>
        <div className="col-span-12 md:col-span-4">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:border-emerald-500 transition-colors cursor-pointer">
            <h3 className="text-lg font-semibold mb-2">Water Wells</h3>
            <p className="text-gray-600 text-sm">Support clean water projects worldwide.</p>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="col-span-12">
          <div className="bg-emerald-50 rounded-lg shadow-md p-6 border border-emerald-100">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-emerald-800 mb-1">Want to start your own fundraising campaign?</h3>
                <p className="text-emerald-600">Create a campaign and reach out to potential donors worldwide.</p>
              </div>
              <button className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center">
                Start Campaign
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecificDonations;