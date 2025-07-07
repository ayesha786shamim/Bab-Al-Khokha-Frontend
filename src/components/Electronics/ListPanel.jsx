// components/BestSeller/ListPanel.jsx
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const ListPanel = ({ products, isDatabaseConnected }) => {
    const router = useRouter();
  return (
    <div className="space-y-4">
      {products.map((product, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center space-x-4 hover:shadow-md transition-shadow">
          {/* Product Image */}
          <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 relative rounded-lg overflow-hidden">
            <Image
              src={product.image || '/Images/placeholder.png'}
              alt={product.name || 'Product'}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">
              {product.name || 'Product Name'}
            </h3>
            
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {product.description || 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'}
            </p>

            {/* Product Meta Info */}
            <div className="flex items-center space-x-4 mb-3 text-xs text-gray-500">
              {product.category && (
                <span className="bg-gray-100 px-2 py-1 rounded">
                  {product.category}
                </span>
              )}
              {product.color && (
                <span className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-1 border border-gray-300"
                    style={{ backgroundColor: product.color }}
                  ></div>
                  {product.color}
                </span>
              )}
              {product.sizes && product.sizes.length > 0 && (
                <span>Sizes: {product.sizes.join(', ')}</span>
              )}
            </div>

            {/* Price and Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-[#CC9966]">
                  ${product.price || '0.00'}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>

               {/* Add to cart */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => router.push(`/ProductDetailPage?id=${product.id}`)}
                  className="px-4 py-2 border border-[#CC9966] text-[#CC9966] rounded hover:bg-[#CC9966] hover:text-white transition-colors text-sm"
                >
                  Add to Cart
                </button>
                <button className="px-4 py-2 bg-[#CC9966] text-white rounded hover:bg-orange-700 transition-colors text-sm">
                  Buy Now
                </button>
              </div>
            </div>

            {/* Status Badge */}
            {product.status && (
              <div className="mt-2">
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  product.status === 'in-stock' 
                    ? 'bg-green-100 text-green-800' 
                    : product.status === 'low-stock'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.status.replace('-', ' ').toUpperCase()}
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListPanel;