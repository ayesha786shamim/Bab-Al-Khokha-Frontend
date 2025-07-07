import React, { useState } from 'react';

const Card = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className="flex flex-col items-center justify-start bg-gray-50 pt-10 p-4">
      <div className="max-w-sm w-full">
        {/* Gift Card Container */}
        <div 
          className={`
            relative cursor-pointer transition-all duration-500 ease-in-out
            transform-gpu perspective-1000
            ${isClicked ? 'scale-110 rotate-1' : 'scale-100 rotate-0'}
            hover:scale-105 hover:-rotate-1 hover:shadow-2xl
            shadow-lg hover:shadow-xl
          `}
          onClick={handleClick}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform += ' translateY(-5px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = e.currentTarget.style.transform.replace(' translateY(-5px)', '');
          }}
        >
          {/* Main Gift Card Image */}
          <div className="relative overflow-hidden rounded-lg bg-white shadow-lg">
            <img 
              src="/Images/GiftCard.png"
              alt="Gift Card"
              className={`
                w-full h-auto transition-all duration-700 ease-out
                ${isClicked ? 'scale-110' : 'scale-100'}
                hover:scale-105
              `}
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Interactive Sparkle Effect */}
            <div className={`
              absolute inset-0 pointer-events-none transition-opacity duration-500
              ${isClicked ? 'opacity-100' : 'opacity-0'}
            `}>
              <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-ping"></div>
              <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-yellow-400 rounded-full animate-ping delay-300"></div>
              <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-yellow-200 rounded-full animate-ping delay-500"></div>
            </div>
          </div>
        </div>

        {/* Card Description */}
        <div className="mt-4 text-center space-y-2">
          <p className="text-gray-600 text-base leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
            ut labore et dolore magna aliqua.
          </p>
          
          <p className="text-gray-600 text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
            ut labore et dolore magna aliqua.
          </p>

          {/* Interactive Button */}
          <button 
            className={`
              px-5 py-2.5 rounded-md text-lg font-semibold text-white transition-all duration-300
              transform hover:scale-105 active:scale-95
              ${isClicked 
                ? 'bg-green-500 hover:bg-green-600 shadow-lg' 
                : 'hover:bg-[#b37a4d] shadow-md'
              }
              hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-300
            `}
            style={!isClicked ? { backgroundColor: '#CC9966' } : {}}
            onClick={handleClick}
          >
            {isClicked ? '✓ Selected' : 'Gift Card'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
