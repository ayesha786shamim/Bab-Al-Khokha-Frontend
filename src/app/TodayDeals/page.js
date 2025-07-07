'use client';
import { useState, useEffect } from 'react';
import Layout from '../../components/CommonComponents/Layout';
import LoadingSpinner from '../../components/CommonComponents/LoadingSpinner';
import FilterSidebar from '../../components/CommonComponents/FilterSidebar';
import ProductPanel from '../../components/TodayDeals/ProductPanel';
import ListPanel from '../../components/TodayDeals/ListPanel';
import Pagination from '../../components/CommonComponents/Pagination';
import { devCollectionAPI } from '../../services/api';
import Image from 'next/image';

export default function TodayDealsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(14);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [viewType, setViewType] = useState('grid');
  const [sortOption, setSortOption] = useState('Default');

  const toggleMobileSidebar = () => setIsMobileSidebarOpen(!isMobileSidebarOpen);
  const closeMobileSidebar = () => setIsMobileSidebarOpen(false);

    useEffect(() => {
    const fetchData = async () => {
        try {
        // Connect to your .NET backend
        const response = await fetch('http://localhost:5192/api/products');
        const data = await response.json();
        setProducts(data.products);
        setFilteredProducts(data.products);
        console.log('✅ Loaded', data.total, 'products for Today\'s Deal');
        } catch (err) {
        console.error('Error:', err);
        } finally {
        setLoading(false);
        }
    };
    fetchData();
    }, []);

  useEffect(() => {
    let filtered = [...products];

    if (filters.categories?.length) {
      filtered = filtered.filter(p => filters.categories.includes(p.category));
    }
    if (filters.priceRange) {
      filtered = filtered.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);
    }
    if (filters.colors?.length) {
      filtered = filtered.filter(p => filters.colors.includes(p.color));
    }
    if (filters.sizes?.length) {
      filtered = filtered.filter(p => p.sizes?.some(size => filters.sizes.includes(size)));
    }
    if (filters.status?.length) {
      filtered = filtered.filter(p => filters.status.includes(p.status));
    }

    // Apply sorting
    switch (sortOption) {
      case 'PriceLowToHigh':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'PriceHighToLow':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'NameAToZ':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'NameZToA':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [filters, products, sortOption]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <LoadingSpinner size="xlarge" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 relative">
        <div className="md:hidden p-4">
          <button
            onClick={toggleMobileSidebar}
            className="text-[#CC9966] bg-gray-100 border p-2 rounded transition-transform duration-300 transform hover:scale-110"
          >
            <div className={`hamburger-icon ${isMobileSidebarOpen ? 'open' : ''}`}>
              <div className="w-6 h-1 bg-[#CC9966] mb-1"></div>
              <div className="w-6 h-1 bg-[#CC9966] mb-1"></div>
              <div className="w-6 h-1 bg-[#CC9966]"></div>
            </div>
          </button>
        </div>

        {isMobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
            onClick={closeMobileSidebar}
          />
        )}

        <div className="flex">
          <FilterSidebar
            onFiltersChange={handleFiltersChange}
            isMobileOpen={isMobileSidebarOpen}
            closeSidebar={closeMobileSidebar}
          />

          <div className="flex-1 p-6">
            <div className="mb-8 relative w-full h-[210px] md:h-[270px] rounded-lg overflow-hidden">
              <Image
                src="/Images/Background image.png"
                alt="Background Image"
                layout="fill"
                objectFit="cover"
                className="absolute top-0 left-0"
              />
              <div className="relative z-10 text-white p-20 text-center font-sans">
                <h1 className="text-5xl font-extrabold tracking-wide mb-4">Today's Deal</h1>
                <p className="text-xl font-semibold">Deals That Deliver More for Less!</p>
              </div>
            </div>

            <div className="mb-6">
              <div className="grid grid-cols-3 items-center gap-4">
                <div className="flex justify-start">
                  <p className="text-[#CC9966] text-sm md:text-base">
                    Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
                  </p>
                </div>

                <div className="flex justify-center">
                  <div className="flex items-center border border-gray-300 rounded-lg p-0.5 md:p-1">
                    <button
                      onClick={() => setViewType('grid')}
                      className={`p-1 md:p-2 rounded transition-colors ${
                        viewType === 'grid' ? 'bg-[#CC9966] text-white' : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      title="Grid View"
                    >
                      <svg className="w-3 h-3 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setViewType('list')}
                      className={`p-1 md:p-2 rounded transition-colors ${
                        viewType === 'list' ? 'bg-[#CC9966] text-white' : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      title="List View"
                    >
                      <svg className="w-3 h-3 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <div className="flex items-center space-x-2 md:space-x-4">
                    <span className="text-xs md:text-sm text-[#CC9966]">Sort by:</span>
                    <select
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                      className="border rounded px-2 md:px-3 py-1 text-[#CC9966] text-xs md:text-sm border-[#CC9966] focus:outline-none focus:ring-1 focus:ring-[#CC9966]"
                    >
                      <option value="Default">Default</option>
                      <option value="PriceLowToHigh">Price: Low to High</option>
                      <option value="PriceHighToLow">Price: High to Low</option>
                      <option value="NameAToZ">Name: A to Z</option>
                      <option value="NameZToA">Name: Z to A</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Display */}
            {currentProducts.length > 0 ? (
              viewType === 'grid' ? (
                <ProductPanel products={currentProducts} isDatabaseConnected={true} />
              ) : (
                <ListPanel products={currentProducts} isDatabaseConnected={true} />
              )
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">No products found matching your filters.</p>
                <button
                  onClick={() => setFilters({})}
                  className="mt-4 bg-[#CC9966] text-white px-6 py-2 rounded hover:bg-orange-700"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                className="mt-8"
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
