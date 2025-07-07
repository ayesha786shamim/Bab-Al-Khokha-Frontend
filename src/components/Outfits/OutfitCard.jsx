import React, { useState } from 'react';
import Image from 'next/image';

const OutfitDetails = ({ 
  outfitData,
  products = []
}) => {
  const [selectedProducts, setSelectedProducts] = useState(products);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleProductSelection = (productId) => {
    setSelectedProducts(prev => 
      prev.map(product => 
        product.id === productId 
          ? { ...product, selected: !product.selected }
          : product
      )
    );
  };

  const removeProduct = (productId) => {
    setSelectedProducts(prev => prev.filter(product => product.id !== productId));
  };

  const selectedCount = selectedProducts.filter(p => p.selected).length;
  const totalPrice = selectedProducts
    .filter(p => p.selected)
    .reduce((sum, product) => sum + product.price, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Left Side - Image */}
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <Image
                src={outfitData?.image || "/images/placeholder-outfit.jpg"}
                alt={outfitData?.name || "Outfit"}
                width={400}
                height={500}
                className="w-full h-auto rounded-lg shadow-lg object-cover"
              />
            </div>
          </div>

          {/* Right Side - Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2" style={{ color: '#CC9966' }}>
                {outfitData?.name || "Outfit Name"}
              </h1>
              <p className="text-gray-600 text-lg mb-4">
                {outfitData?.shortDescription || "Short description of the outfit style."}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {outfitData?.detailedDescription || "Detailed description about this outfit style and how it can enhance your wardrobe."}
              </p>
            </div>

            <div className="text-center">
              <button className="text-sm font-medium mb-4" style={{ color: '#CC9966' }}>
                Discover your perfect {outfitData?.name?.toLowerCase() || "outfit"} look now!
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 bg-gray-100 p-6 rounded-lg">
              <div className="text-center">
                <h3 className="text-gray-600 text-sm font-medium">Total Outfits</h3>
                <p className="text-2xl font-bold text-gray-800">
                  {selectedCount.toString().padStart(2, '0')}
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-gray-600 text-sm font-medium">Total Price</h3>
                <p className="text-2xl font-bold text-gray-800">
                  {totalPrice.toFixed(2)}$
                </p>
              </div>
            </div>

            {/* Buy Button */}
            <button 
              className="w-full py-3 text-white font-medium rounded-lg transition-colors hover:opacity-90"
              style={{ backgroundColor: '#CC9966' }}
            >
              Buy The Outfits
            </button>
          </div>
        </div>

        {/* Products Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Header */}
          <div 
            className="p-4 cursor-pointer flex justify-between items-center"
            style={{ backgroundColor: '#CC9966' }}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <h2 className="text-white font-medium">
              {outfitData?.name || "Outfit"} Items
            </h2>
            <span className="text-white text-xl">
              {isExpanded ? '−' : '+'}
            </span>
          </div>

          {/* Products Table */}
          {isExpanded && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Product Name</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Price</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Stock Status</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {selectedProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => removeProduct(product.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            ×
                          </button>
                          <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0 overflow-hidden">
                            <Image
                              src={product.image || "/images/placeholder-product.jpg"}
                              alt={product.name}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="font-medium text-gray-900">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-900">
                        {product.price.toFixed(2)}$
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          product.stockStatus === 'In Stock' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.stockStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleProductSelection(product.id)}
                          className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                            product.selected
                              ? 'text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                          style={product.selected ? { backgroundColor: '#CC9966' } : {}}
                        >
                          {product.selected ? 'Selected' : 'Select'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Sample usage with props structure
export default function OutfitDetailsPage() {
  // Sample data structure - replace with actual props/data
  const sampleOutfitData = {
    name: "Office Chic",
    image: "/images/office-chic.jpg",
    shortDescription: "Elegant and professional looks for your workplace.",
    detailedDescription: "Elevate your professional style with our Office Chic recommendations. These outfits combine elegance and sophistication, perfect for making a solid impression at work."
  };

  const sampleProducts = [
    {
      id: 1,
      name: "Professional Pant",
      price: 100.00,
      image: "/images/pant.jpg",
      stockStatus: "In Stock",
      selected: true
    },
    {
      id: 2,
      name: "Silk Tie",
      price: 50.00,
      image: "/images/tie.jpg",
      stockStatus: "In Stock",
      selected: true
    },
    {
      id: 3,
      name: "Leather Shoes",
      price: 150.00,
      image: "/images/shoes.jpg",
      stockStatus: "In Stock",
      selected: true
    },
    {
      id: 4,
      name: "Dress Shirt",
      price: 80.00,
      image: "/images/shirt.jpg",
      stockStatus: "Low Stock",
      selected: false
    }
  ];

  return (
    <OutfitDetails 
      outfitData={sampleOutfitData}
      products={sampleProducts}
    />
  );
}