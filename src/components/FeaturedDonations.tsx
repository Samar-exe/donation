import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Carousel, {
  SliderContainer,
  Slider,
  SliderPrevButton,
  SliderNextButton
} from './Carousel';

interface DonationCategory {
  id: string;
  name: string;
  title: string;
}

const FeaturedDonations = () => {
  const categories: DonationCategory[] = [
    {
      id: '1',
      name: 'masjid',
      title: 'Masjid'
    },
    {
      id: '2',
      name: 'education',
      title: 'Education'
    },
    {
      id: '3',
      name: 'emergency',
      title: 'Emergency'
    },
    {
      id: '4',
      name: 'heritage',
      title: 'Heritage'
    }
  ];

  return (
    <div className="relative py-12 px-10 bg-gray-200">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-left container mx-auto">Featured Donations</h2>

      </div>
      <div>
        <Carousel
          options={{ loop: true }}
          className="w-full max-w-3xl mx-auto"
          activeSlider={true}
          isScale={true}
        >
          <SliderContainer>
            {categories.map((category) => (
              <Slider key={category.id} className="flex-[0_0_33.333%] min-w-0 px-4">
                <div className="slider_content">
                  <div className="w-64 h-64 bg-white rounded-lg shadow-lg flex items-center justify-center border border-gray-200 transition-all duration-300 hover:border-emerald-500 cursor-pointer">
                    <h3 className="text-2xl font-medium text-gray-800">{category.title}</h3>
                  </div>
                </div>
              </Slider>
            ))}
          </SliderContainer>

          <div className="absolute left-40 right-40 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none px-4">
            <SliderPrevButton className="pointer-events-auto w-10 h-10 bg-white shadow-lg rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </SliderPrevButton>
            <SliderNextButton className="pointer-events-auto w-10 h-10 bg-white shadow-lg rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </SliderNextButton>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default FeaturedDonations;