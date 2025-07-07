'use client';
import { useState, useEffect } from 'react';

const FilterSidebar = ({ onFiltersChange, isMobileOpen, closeSidebar, headerHeight = "64px" }) => {
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [0, 1000],
    colors: [],
    sizes: [],
    status: []
  });

const categories = [
  'Fashion', 
  'Belts', 
  'Clothing', 
  'Electronics', 
  'Toys',
  'Accessories', 
  'Cosmetics', 
  'Makeup', 
  'Shoes', 
  'Glasses', 
  'Wallet'
];


  const colors = [
    { name: 'Red', value: '#ef4444' },
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Green', value: '#10b981' },
    { name: 'Yellow', value: '#f59e0b' },
    { name: 'Purple', value: '#8b5cf6' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Orange', value: '#f97316' },
    { name: 'Gray', value: '#6b7280' },
    { name: 'Black', value: '#000000' }
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const statusOptions = ['New', 'Sale', 'Featured', 'On Sale'];

  const handleFilterChange = (type, value) => {
    let newFilters = { ...filters };

    if (['categories', 'colors', 'sizes', 'status'].includes(type)) {
      if (newFilters[type].includes(value)) {
        newFilters[type] = newFilters[type].filter(item => item !== value);
      } else {
        newFilters[type] = [...newFilters[type], value];
      }
    } else if (type === 'priceRange') {
      newFilters[type] = value;
    }

    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      categories: [],
      priceRange: [0, 1000],
      colors: [],
      sizes: [],
      status: []
    };
    setFilters(resetFilters);
  };

  // Debounce filters change
  useEffect(() => {
    const timer = setTimeout(() => {
      onFiltersChange && onFiltersChange(filters);
    }, 300);
    return () => clearTimeout(timer);
  }, [filters]);

  const SidebarContent = () => (
    <div className="p-6">
      {/* Categories */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Products:</h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category}>
              <label className="flex items-center cursor-pointer hover:text-orange-600">
                <input
                  type="checkbox"
                  className="mr-3 text-orange-600"
                  checked={filters.categories.includes(category)}
                  onChange={() => handleFilterChange('categories', category)}
                />
                <span className="text-sm text-gray-700">{category}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Filter */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Filter by Price:</h3>
        <div className="px-2">
          <input
            type="range"
            min="0"
            max="1000"
            value={filters.priceRange[1]}
            onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
            className="w-full accent-orange-600"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>$0</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Colors */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Filter by Colors:</h3>
        <div className="grid grid-cols-3 gap-2">
          {colors.map((color) => (
            <label key={color.name} className="cursor-pointer">
              <input
                type="checkbox"
                className="sr-only"
                checked={filters.colors.includes(color.name)}
                onChange={() => handleFilterChange('colors', color.name)}
              />
              <div
                className={`w-8 h-8 rounded border-2 transition-colors ${
                  filters.colors.includes(color.name) ? 'border-gray-800' : 'border-gray-300'
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Filter by Size:</h3>
        <div className="grid grid-cols-3 gap-2">
          {sizes.map((size) => (
            <label key={size} className="cursor-pointer">
              <input
                type="checkbox"
                className="sr-only"
                checked={filters.sizes.includes(size)}
                onChange={() => handleFilterChange('sizes', size)}
              />
              <div
                className={`text-center py-2 border rounded text-sm transition-colors ${
                  filters.sizes.includes(size)
                    ? 'border-orange-600 bg-orange-50 text-orange-600'
                    : 'border-gray-300 text-gray-700 hover:border-orange-400'
                }`}
              >
                {size}
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Product Status:</h3>
        <div className="space-y-2">
          {statusOptions.map((status) => (
            <label key={status} className="flex items-center cursor-pointer hover:text-orange-600">
              <input
                type="checkbox"
                className="mr-3 text-orange-600"
                checked={filters.status.includes(status)}
                onChange={() => handleFilterChange('status', status)}
              />
              <span className="text-sm text-gray-700">{status}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <div className="mt-4">
        <button
          onClick={handleResetFilters}
          className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 text-sm"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );

  return (
    <>
      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Desktop Sidebar */}
      <div
        className="hidden md:block w-64 bg-white border-r border-gray-200 sticky overflow-y-auto hide-scrollbar"
        style={{
          top: headerHeight,
          height: `calc(100vh - ${headerHeight})`,
          scrollBehavior: 'smooth'
        }}
      >
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`md:hidden fixed bg-white w-64 z-50 transform transition-transform duration-500 ease-in-out overflow-y-auto hide-scrollbar shadow-lg`}
        style={{
          top: headerHeight,
          height: `calc(100vh - ${headerHeight})`,
          left: 0,
          transform: isMobileOpen ? 'translateX(0)' : 'translateX(-100%)',
          scrollBehavior: 'smooth'
        }}
      >
        <div className="p-4 border-b flex justify-end">
          <button
            onClick={closeSidebar}
            className="text-gray-600 text-2xl hover:text-gray-800"
          >
            &times;
          </button>
        </div>
        <SidebarContent />
      </div>
    </>
  );
};

export default FilterSidebar;
