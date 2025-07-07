// src/components/ProductGrid.jsx
import ProductCard from './ProductCard';

const ProductGrid = ({ 
  products = [], 
  title, 
  showBestSeller = false,
  loading = false,
  onAddToCart,
  onToggleFavorite,
  emptyMessage = "No products found",
  className = ""
}) => {

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="bg-white rounded-lg shadow-sm animate-pulse">
      <div className="h-64 bg-gray-200 rounded-t-lg"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-3 bg-gray-200 rounded mb-3 w-3/4"></div>
        <div className="flex items-center justify-between mb-3">
          <div className="h-6 bg-gray-200 rounded w-16"></div>
          <div className="h-4 bg-gray-200 rounded w-12"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
    </div>
  );

  // Empty state component
  const EmptyState = () => (
    <div className="col-span-full text-center py-16">
      <div className="text-6xl text-gray-300 mb-4">🛍️</div>
      <h3 className="text-xl font-semibold text-gray-600 mb-2">{emptyMessage}</h3>
      <p className="text-gray-500">Try adjusting your search or filter criteria</p>
    </div>
  );

  return (
    <section className={`py-12 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        {title && (
          <div className="text-center mb-12">
            {showBestSeller && (
              <div className="inline-block bg-[#CC9966] text-white px-6 py-2 rounded-full text-sm font-semibold mb-4 tracking-wide">
                BEST SELLER
              </div>
            )}
            <h2 className="text-3xl lg:text-4xl font-bold text-[#CC9966] mb-4">{title}</h2>
          </div>
        )}
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            // Show loading skeletons
            Array.from({ length: 8 }).map((_, index) => (
              <LoadingSkeleton key={`skeleton-${index}`} />
            ))
          ) : products.length > 0 ? (
            // Show products
            products.map((product) => (
              <ProductCard 
                key={product.id || product._id} 
                product={product}
                onAddToCart={onAddToCart}
                onToggleFavorite={onToggleFavorite}
              />
            ))
          ) : (
            // Show empty state
            <EmptyState />
          )}
        </div>

        {/* Load More Section - Can be controlled by parent component */}
        {!loading && products.length > 0 && products.length % 12 === 0 && (
          <div className="text-center mt-12">
            <button className="bg-amber-600 text-white px-8 py-3 rounded-lg hover:bg-amber-700 transition-colors font-medium">
              Load More Products
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;