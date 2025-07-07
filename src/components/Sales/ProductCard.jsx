import { useRouter } from 'next/navigation';

const ProductCard = ({ product }) => {
  const router = useRouter();

  const handleAddToCart = () => {
    router.push(`/ProductDetailPage?id=${product.id}`);
  };

  const handleBuyNow = () => {
    router.push('/Checkout');
  };

  // Calculate discount percentage
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const offPercent = hasDiscount
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="relative bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      {/* Discount Badge - Top Left */}
      {hasDiscount && (
        <div className="absolute top-2 left-2 z-10">
          <span className="bg-red-600 text-white px-2 py-1 text-xs font-bold rounded shadow-sm">
            {offPercent}% OFF
          </span>
        </div>
      )}

      {/* Stock Status Badge - Top Right */}
      {product.status && (
        <div className="absolute top-2 right-2 z-10">
          <span
            className={`inline-block px-2 py-1 rounded text-xs font-medium ${
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

      {/* Product Image */}
      <div className="w-full h-48 bg-gray-100 mb-4 flex items-center justify-center rounded overflow-hidden">
        <img
          src={product.image || 'https://via.placeholder.com/200x200?text=Product'}
          alt={product.name || 'Product'}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Product Info */}
      <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 h-10">
        {product.name || 'Product Name'}
      </h3>

      {/* Category Badge */}
      {product.category && (
        <div className="mb-2">
          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
            {product.category}
          </span>
        </div>
      )}

      {/* Price Section */}
      <div className="flex flex-col mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-[#CC9966]">
            ${product.price ? product.price.toFixed(2) : '0.00'}
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-500 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        {hasDiscount && (
          <span className="text-xs text-green-600 font-medium">
            Save ${(product.originalPrice - product.price).toFixed(2)}
          </span>
        )}
      </div>

      {/* Product Meta Info */}
      {(product.color || product.sizes?.length > 0) && (
        <div className="flex items-center gap-3 mb-3 text-xs text-gray-500">
          {product.color && (
            <span className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-1 border border-gray-300"
                style={{ backgroundColor: product.color }}
              ></div>
              {product.color}
            </span>
          )}
          {product.sizes?.length > 0 && (
            <span>Sizes: {product.sizes.slice(0, 2).join(', ')}{product.sizes.length > 2 ? '...' : ''}</span>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2 mt-auto">
        <button
          onClick={handleAddToCart}
          className="flex-1 px-3 py-2 border border-[#CC9966] text-[#CC9966] rounded hover:bg-[#CC9966] hover:text-white transition-colors text-xs font-medium"
        >
          Add to Cart
        </button>
        <button
          onClick={handleBuyNow}
          className="flex-1 px-3 py-2 bg-[#CC9966] text-white rounded hover:bg-orange-700 transition-colors text-xs font-medium"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;