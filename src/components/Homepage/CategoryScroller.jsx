"use client";

import { useRef, useState, useEffect } from "react";
import CategoryCard from "./CategoryCard";

const CategoryScroller = ({ categories }) => {
  const containerRef = useRef(null);
  const [leftPressed, setLeftPressed] = useState(false);
  const [rightPressed, setRightPressed] = useState(false);
  const [cardWidth, setCardWidth] = useState(0);

  // Set card width dynamically based on screen size
  useEffect(() => {
    const updateCardWidth = () => {
      const container = containerRef.current;
      if (!container) return;

      const totalWidth = container.offsetWidth;

      const screenWidth = window.innerWidth;
      const cardsVisible = screenWidth < 768 ? 1 : 4; // 1 card on mobile, 4 on desktop
      const newCardWidth = totalWidth / cardsVisible;

      setCardWidth(newCardWidth);
    };

    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);
    return () => window.removeEventListener("resize", updateCardWidth);
  }, []);

  const scrollByAmount = cardWidth;

  const scrollLeft = () => {
    if (containerRef.current) {
      setLeftPressed(true);
      containerRef.current.scrollBy({ left: -scrollByAmount, behavior: "smooth" });
      setTimeout(() => setLeftPressed(false), 150);
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      setRightPressed(true);
      containerRef.current.scrollBy({ left: scrollByAmount, behavior: "smooth" });
      setTimeout(() => setRightPressed(false), 150);
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#CC9966]">
        Shop Categories
        </h2>

        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          aria-label="Scroll Left"
          className={`absolute top-1/2 left-0 transform -translate-y-1/2 w-12 h-12 rounded-full z-10 transition-all duration-300 flex items-center justify-center ${
            leftPressed
              ? "bg-[#CC9966] text-white scale-95 shadow-inner"
              : "bg-white text-[#CC9966] border border-[#CC9966] hover:bg-[#CC9966] hover:text-white"
          } hidden sm:flex`}
        >
          ‹
        </button>

        {/* Scrollable container */}
        <div
          ref={containerRef}
          className="flex overflow-x-auto scroll-smooth space-x-6 px-2 sm:px-12 snap-x snap-mandatory"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {categories.map((category, index) => (
            <div
              key={`${category.slug || category.name}-${index}`}
              className="flex-shrink-0 snap-start"
              style={{ width: `${cardWidth}px`, minWidth: `${cardWidth}px` }}
            >
              <CategoryCard category={category} />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          aria-label="Scroll Right"
          className={`absolute top-1/2 right-0 transform -translate-y-1/2 w-12 h-12 rounded-full z-10 transition-all duration-300 flex items-center justify-center ${
            rightPressed
              ? "bg-[#CC9966] text-white scale-95 shadow-inner"
              : "bg-white text-[#CC9966] border border-[#CC9966] hover:bg-[#CC9966] hover:text-white"
          } hidden sm:flex`}
        >
          ›
        </button>

        {/* Hide scrollbars (cross-browser) */}
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </section>
  );
};

export default CategoryScroller;
