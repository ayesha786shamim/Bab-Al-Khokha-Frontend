'use client';

import React from 'react';

const Wishlist = ({ wishlistItems = [], setWishlistItems }) => {
  const removeProduct = (id) => {
    try {
      // Remove from localStorage
      const wishlistIds = JSON.parse(localStorage.getItem('wishlist') || '[]');
      const updatedIds = wishlistIds.filter(productId => productId !== id);
      localStorage.setItem('wishlist', JSON.stringify(updatedIds));

      // Update local state
      const updatedProducts = wishlistItems.filter(product => product.id !== id);
      setWishlistItems(updatedProducts);
      
      console.log('✅ Removed product from wishlist:', id);
    } catch (error) {
      console.error('❌ Error removing from wishlist:', error);
    }
  };

  const handleAddToCart = (product) => {
    if (!product) return;

    try {
      // Add to cart via localStorage (keeping it simple)
      const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
      
      const cartItem = {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        size: 'N/A',
        color: 'N/A',
        quantity: 1,
      };

      const existingIndex = cartItems.findIndex(
        (item) => item.id === cartItem.id &&
                  item.size === cartItem.size &&
                  item.color === cartItem.color
      );

      if (existingIndex >= 0) {
        cartItems[existingIndex].quantity += 1;
      } else {
        cartItems.push(cartItem);
      }

      localStorage.setItem('cart', JSON.stringify(cartItems));
      console.log('✅ Added to cart:', product.name);
      alert(`Added to cart: ${product.name}`);
    } catch (error) {
      console.error('❌ Error adding to cart:', error);
      alert('Failed to add to cart. Please try again.');
    }
  };

  const getStatusColor = (status) => {
    if (!status) return "text-gray-600";
    return status.toLowerCase().includes("sale") ? "text-red-600" : "text-green-600";
  };

  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return `$${price.toFixed(2)}`;
    }
    return price || 'N/A';
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 bg-white">
      {/* Header for medium and up */}
      <div className="hidden md:grid grid-cols-12 gap-4 pb-4 mb-6 border-b-2 border-gray-200">
        <div className="col-span-1" />
        <div className="col-span-4">
          <h3 className="font-semibold text-gray-700 text-lg">Product Name</h3>
        </div>
        <div className="col-span-2 text-center">
          <h3 className="font-semibold text-gray-700 text-lg">Price</h3>
        </div>
        <div className="col-span-3 text-center">
          <h3 className="font-semibold text-gray-700 text-lg">Stock Status</h3>
        </div>
        <div className="col-span-2" />
      </div>

      {/* Product List */}
      <div className="space-y-4">
        {wishlistItems.length > 0 ? (
          wishlistItems.map((product) => (
            <div
              key={product.id}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200"
            >
              {/* Remove Button */}
              <div className="flex justify-end md:justify-start md:col-span-1">
                <button
                  onClick={() => removeProduct(product.id)}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors duration-200 text-xl font-bold"
                  aria-label="Remove"
                >
                  ×
                </button>
              </div>

              {/* Product Info */}
              <div className="flex md:col-span-4 items-center space-x-3">
                <img
                  src={product.image || 'https://via.placeholder.com/64x64?text=Product'}
                  alt={product.name || 'Product'}
                  className="w-16 h-16 object-cover rounded-md border border-gray-200"
                />
                <h4 className="font-medium text-gray-800 text-sm md:text-base">
                  {product.name || 'Product Name'}
                </h4>
              </div>

              {/* Price */}
              <div className="text-center md:col-span-2 text-gray-800 font-semibold text-sm">
                {formatPrice(product.price)}
              </div>

              {/* Stock Status */}
              <div className="text-center md:col-span-3 text-sm md:text-base">
                <span className={`font-medium ${getStatusColor(product.status || product.stockStatus)}`}>
                  {product.status || product.stockStatus || 'In Stock'}
                </span>
              </div>

              {/* Add to Cart */}
              <div className="md:col-span-2">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full mt-2 md:mt-0 px-4 py-2 bg-[#CC9966] hover:bg-[#b9854e] text-white text-sm md:text-base font-medium rounded-md transition duration-200 transform hover:scale-105 active:scale-95"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products in your wishlist</p>
            <p className="text-gray-400 text-sm mt-2">Start browsing products to add them to your wishlist!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;