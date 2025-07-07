// src/components/ProductCard.jsx
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const ProductCard = ({ product, onAddToCart, onToggleFavorite, className = '' }) => {
  const [imageError, setImageError] = useState(false);
  const [isFavorite, setIsFavorite] = useState(product?.isFavorite || false);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  if (!product) {
    return null;
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group ${className}`}>
      <div className="relative overflow-hidden rounded-t-lg">
        <Link href={`/products/${product.id}`}>
          <div className="relative w-full h-64 bg-gray-100">
            {!imageError && product.imageurl ? (
              <Image
                src={product.imageurl}
                alt={product.name || 'Product'}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                onError={handleImageError}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <div className="text-center">
                  <div className="text-4xl text-gray-400 mb-2">📷</div>
                  <span className="text-gray-500 text-sm">No Image</span>
                </div>
              </div>
            )}
          </div>
        </Link>
      </div>
      
      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-amber-600 transition-colors line-clamp-2 cursor-pointer">
            {product.name || 'Unnamed Product'}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description || 'No description available'}
        </p>
      
      </div>
    </div>
  );
};

export default ProductCard;