
// src/pages/products/index.js (Products Listing Page)
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import ProductGrid from '../../components/Homepage/ProductGrid';
import FilterSidebar from '../../components/FilterSidebar1';
import Breadcrumb from '../../components/Breadcrumb';
import { devProductAPI, devCategoryAPI } from '../../services/api';

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: router.query.category || 'all',
    search: router.query.search || '',
    sortBy: 'name',
    priceRange: '',
    rating: ''
  });

  // Fetch data based on filters
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // This will connect to your .NET API
        const result = await devProductAPI.getAll(filters);
        setProducts(result.products || result);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await devCategoryAPI.getAll();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = (searchQuery) => {
    setFilters(prev => ({ ...prev, search: searchQuery }));
    router.push(`/products?search=${encodeURIComponent(searchQuery)}`, undefined, { shallow: true });
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleSortChange = (sortBy) => {
    setFilters(prev => ({ ...prev, sortBy }));
  };

  const handleAddToCart = async (product) => {
    try {
      console.log('Adding to cart:', product);
      // await cartAPI.addItem(product.id);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleToggleFavorite = async (product) => {
    try {
      console.log('Toggle favorite:', product);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const breadcrumbItems = [
    { label: 'Products', href: '/products' }
  ];

  if (filters.category && filters.category !== 'all') {
    breadcrumbItems.push({ label: filters.category });
  }

  return (
    <Layout title={`Products ${filters.category !== 'all' ? `- ${filters.category}` : ''} | Bab Al Khokha`}>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} className="mb-6" />

          {/* Page Header */}
          <div className="text-center mb-8">
            <div className="inline-block bg-amber-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              BEST SELLER
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {filters.category !== 'all' ? filters.category : 'All Products'}
            </h1>
            <p className="text-gray-600">Discover our amazing collection</p>
          </div>


          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <div className="lg:col-span-1">
              <FilterSidebar
                categories={categories}
                selectedFilters={filters}
                onFilterChange={handleFilterChange}
              />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Sort Controls */}
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600">
                  {loading ? 'Loading...' : `Showing ${products.length} products`}
                </p>
                
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                </select>
              </div>

              {/* Products Grid */}
              <ProductGrid
                products={products}
                loading={loading}
                onAddToCart={handleAddToCart}
                onToggleFavorite={handleToggleFavorite}
                emptyMessage="No products found matching your criteria"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
