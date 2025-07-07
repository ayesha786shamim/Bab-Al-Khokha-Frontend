'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const Welcome = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-5 py-8">

        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8" style={{ color: '#CC9966' }}>
          Welcome to Bab El Khokha's AI Stylist!
        </h1>

        {/* Intro Text */}
        <div className="mb-12 max-w-4xl mx-auto">
          <p className="text-lg text-gray-600 leading-relaxed text-left">
            Discover your perfect look with <span className="font-semibold" style={{ color: '#CC9966' }}>Bab El Khokha's AI Stylist</span>, your personal fashion assistant! Our AI-powered tool analyzes your style preferences and suggests perfect outfits from our collection that best suit your style and the occasion.
          </p>
        </div>

        {/* Style Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {['Office Chic', 'Date Night Elegance', 'Everyday Casual'].map((category) => (
            <div key={category} className="text-left p-4 border border-gray-200 rounded-lg hover:shadow-lg hover:border-[#CC9966] transition-all cursor-pointer">
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#CC9966' }}>
                {category}
              </h3>
              <p className="text-gray-600">
                {category === 'Office Chic' && 'Professional looks for your workplace.'}
                {category === 'Date Night Elegance' && 'Sophisticated charm for romantic occasions.'}
                {category === 'Everyday Casual' && 'Comfortable and stylish looks for daily activities.'}
              </p>
            </div>
          ))}
        </div>

        {/* How to Use Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-left" style={{ color: '#CC9966' }}>
            How to Use the AI Stylist:
          </h2>

          {[{
            step: '1',
            title: 'Upload Your Photo',
            desc: 'Select and upload a clear photo of yourself or choose from previously uploaded images to see your style recommendations.'
          }, {
            step: '2',
            title: 'Fill in Your Details',
            desc: 'Provide some basic information like preferences, favorite colors, and body measurements to help our AI understand your style.'
          }, {
            step: '3',
            title: 'Get Personalized Recommendations',
            desc: 'Our AI analyzes your inputs and photos to suggest outfits from our collection that perfectly match your style and the occasion.'
          }].map(({ step, title, desc }) => (
            <div key={step} className="flex items-start space-x-4 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-full text-white font-bold" style={{ backgroundColor: '#CC9966' }}>
                {step}
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-1" style={{ color: '#CC9966' }}>
                  {title}
                </h4>
                <p className="text-gray-600">{desc}</p>
              </div>
            </div>
          ))}

          <p className="text-gray-600 text-lg mt-8 text-left">
            Ready to transform your wardrobe? Start now and let <span className="font-semibold" style={{ color: '#CC9966' }}>Bab El Khokha's AI Stylist</span> curate the perfect look for you!
          </p>
        </div>

        {/* Outfit Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
          
          {[
            { img: '/images/office-chic.jpg', label: 'Office Chic' },
            { img: '/images/everyday-casual.jpg', label: 'Everyday Casual' },
            { img: '/images/date-night.jpg', label: 'Date Night Elegance' }
          ].map(({ img, label }) => (
            <div key={label} className="bg-white rounded-xl overflow-hidden shadow-lg">
              <div className="h-80 relative">
                <img src={img} alt={`${label} Style`} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded">
                  {label}
                </div>
              </div>
              <div className="text-center py-4">
                <div className="flex flex-col sm:flex-row gap-3 px-4 pb-4">
                  <button
                    onClick={() => router.push('/Outfits')}
                    className="px-6 py-3 text-white rounded-md font-medium transition-colors hover:opacity-90"
                    style={{ backgroundColor: '#CC9966' }}
                  >
                    Buy the Outfit
                  </button>
                  <button
                    onClick={() => router.push('/Outfits')}
                    className="px-6 py-3 border border-[#CC9966] text-[#CC9966] rounded-md font-medium transition-colors hover:bg-[#CC9966] hover:text-white"
                  >
                    Shop Me Outfits
                  </button>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Welcome;
