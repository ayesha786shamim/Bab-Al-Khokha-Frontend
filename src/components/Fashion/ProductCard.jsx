'use client';

import { useRouter } from 'next/navigation';

const ProductCard = ({ product }) => {
  const router = useRouter();

  const handleAddToCart = () => {
    router.push(`/ProductDetailPage?id=${product.id}`);
  };

  const handleBuyNow = () => {
    router.push('/Checkout'); // Change this if your Buy Now route is different
  };

  return (
    <div className="relative bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      {/* Product Image */}
      <div className="w-full h-48 bg-gray-100 mb-4 flex items-center justify-center rounded">
        <img
          src={product.image || 'https://via.placeholder.com/200x200?text=Product'}
          alt={product.name}
          className="h-full w-full object-cover rounded"
        />
      </div>

      {/* Stock Status Badge */}
      {product.status && (
        <div className="absolute top-2 right-2 z-10">
          <span
            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
              product.status === 'in-stock'
                ? 'bg-green-100 text-green-800'
                : product.status === 'low-stock'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {product.status.replace('-', ' ').toUpperCase()}
          </span>
        </div>
      )}

      {/* Product Info */}
      <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2">
        {product.name}
      </h3>

      <div className="flex items-center justify-between mb-3">
        <span className="text-lg font-bold text-orange-600">
          ${product.price}
        </span>
        {product.originalPrice && (
          <span className="text-sm text-gray-500 line-through">
            ${product.originalPrice}
          </span>
        )}
      </div>

      {/* Action Buttons (Horizontally aligned like ListPanel) */}
      <div className="flex justify-between space-x-2 mt-3">
        <button
          onClick={handleAddToCart}
          className="flex-1 px-4 py-2 border border-[#CC9966] text-[#CC9966] rounded hover:bg-[#CC9966] hover:text-white transition-colors text-xs text-center"
        >
          Add to Cart
        </button>
        <button
          onClick={handleBuyNow}
          className="flex-1 px-4 py-2 bg-[#CC9966] text-white rounded hover:bg-orange-700 transition-colors text-xs text-center"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
