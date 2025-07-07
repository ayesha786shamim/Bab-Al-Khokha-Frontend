import Link from 'next/link';
import { useState } from 'react';

const CategoryCard = ({ category, className = "" }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageError = () => {
    console.log('❌ Image failed to load for category:', category.name, 'URL:', imageUrl);
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    console.log('✅ Image loaded successfully for category:', category.name);
    setImageLoading(false);
  };

  if (!category) {
    console.log('❌ CategoryCard: No category data provided');
    return null;
  }

  // Handle both imageUrl and imageurl properties
  const imageUrl = category.imageUrl || category.imageurl;
  
  console.log('🖼️ CategoryCard rendering:', category.name, 'with image:', imageUrl);

  return (
    <Link 
      href={`/categories/${category.name?.toLowerCase().replace(/\s+/g, '-')}`}
      className={`group cursor-pointer block ${className}`}
    >
      <div className="relative h-44 md:h-48 rounded-md overflow-hidden mb-4 shadow-md group-hover:shadow-lg transition-all duration-300">
        {!imageError && imageUrl ? (
          <>
            {imageLoading && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center z-10">
                <div className="text-gray-400">Loading...</div>
              </div>
            )}
            <img
              src={imageUrl} 
              alt={category.name || 'Category'}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={handleImageError}
              onLoad={handleImageLoad}
              style={{ display: imageLoading ? 'none' : 'block' }}
            />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl text-amber-400 mb-2">🏷️</div>
              <span className="text-amber-600 text-sm font-medium">
                {imageError ? 'Image Error' : 'No Image'}
              </span>
              {imageError && (
                <div className="text-xs text-red-500 mt-1 max-w-40 break-words">
                  {imageUrl}
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Light overlay only on hover for better text readability */}
        <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300"></div>
        

      </div>
      
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
          {category.name}
        </h3>
      </div>
    </Link>
  );
};

export default CategoryCard;