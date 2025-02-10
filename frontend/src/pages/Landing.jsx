import React from 'react';
import NoticeBoard from '../components/Notice';
import ImageSlider from '../components/ImageSlider';

const Landing = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4">
      {/* Image Slider (Responsive) */}
      <div className="w-full lg:w-3/4 h-[50vh] lg:h-[65vh] rounded-lg overflow-hidden">
        <ImageSlider />
      </div>

      {/* Notice Board (Responsive) */}
      <div className="w-full lg:w-1/4">
        <NoticeBoard />
      </div>
    </div>
  );
};

export default Landing;
