import React from 'react';

const ContentLayout = () => {
  return (
    <div className="max-w-6xl mx-auto p-8 bg-white">
      {/* Header Text Section */}
      <div className="mb-12 text-center">
        <p className="text-gray-700 text-base leading-7 max-w-4xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
          ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      {/* Main Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Left Text Content */}
        <div className="space-y-6">
          <p className="text-gray-700 text-base leading-7">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore 
            magna aliqua. Lorem ipsum dolor sit amet, consectetur 
            adipiscing elit, sed do eiusmod tempor incididunt ut 
            labore et dolore magna aliqua.
          </p>
          
          <p className="text-gray-700 text-base leading-7">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore 
            magna aliqua. Lorem ipsum dolor sit amet, consectetur 
            adipiscing elit, sed do eiusmod tempor incididunt ut 
            labore et dolore magna aliqua.
          </p>
        </div>

        {/* Right Main Image */}
        <div className="relative">
          <img 
            src="/Images/AboutUs1.png" 
            alt="Store Interior"
            className="w-full h-80 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      {/* Image Gallery Grid */}
      <div className="mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Fashion/Shoes Image */}
          <div className="relative group">
            <img 
              src="/Images/AboutUs2.png" 
              alt="Fashion Shoes"
              className="w-full h-32 object-cover rounded-md shadow-md group-hover:scale-105 transition-transform duration-300 cursor-pointer"
            />
          </div>

          {/* Accessories Image */}
          <div className="relative group">
            <img 
              src="/Images/AboutUs4.png" 
              alt="Accessories"
              className="w-full h-32 object-cover rounded-md shadow-md group-hover:scale-105 transition-transform duration-300 cursor-pointer"
            />
          </div>

          {/* Toys/Teddy Bear Image */}
          <div className="relative group">
            <img 
              src="/Images/AboutUs4.png" 
              alt="Toys and Teddy Bear"
              className="w-full h-32 object-cover rounded-md shadow-md group-hover:scale-105 transition-transform duration-300 cursor-pointer"
            />
          </div>

          {/* Business/Analytics Image */}
          <div className="relative group">
            <img 
              src="/Images/AboutUs5.png" 
              alt="Business Analytics"
              className="w-full h-32 object-cover rounded-md shadow-md group-hover:scale-105 transition-transform duration-300 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Bottom Text Sections */}
      <div className="space-y-8 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-700 text-base leading-7">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
            ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <p className="text-gray-700 text-base leading-7">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
            ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor 
            sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore 
            magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
            tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-700 text-base leading-7">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
            ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContentLayout;