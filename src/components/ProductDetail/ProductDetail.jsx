'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const categoryOptions = {
  Clothing: { sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
  Shoes: { sizes: ['6', '7', '8', '9', '10', '11', '12'] },
  Accessories: { sizes: ['S', 'M', 'L'] },
  Electronics: {},
  Bags: {},
  Fitness: {},
  Home: {},
};

const fallbackColors = [
  '#8B0000', '#0000FF', '#D3D3D3', '#FFFF00', '#FF00FF',
  '#FFA500', '#008000', '#00FFFF', '#800080', '#A52A2A',
  '#FF4500', '#2E8B57', '#DA70D6', '#DC143C', '#1E90FF',
  '#B8860B', '#FF1493', '#556B2F', '#00CED1', '#4682B4', '#7B68EE'
];

export default function ProductDetail({ productId }) {
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');
  const [colors, setColors] = useState([]);
  const [wishlist, setWishlist] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        
        // Fetch from your .NET backend
        const response = await fetch('http://localhost:5192/api/products');
        const data = await response.json();
        const products = data.products;
        
        setCollection(products);
        const found = products.find((p) => p.id === productId);
        if (!found) throw new Error('Product not found');
        setProduct(found);

        const sixColors = fallbackColors.slice(0, 6);
        setColors(sixColors);
        
        console.log('✅ Loaded product:', found.name);
      } catch (err) {
        setError(err.message || 'Error loading product');
        console.error('❌ Error loading product:', err);
      } finally {
        setLoading(false);
      }
    };

    if (productId) fetchProduct();
  }, [productId]);

  useEffect(() => {
    if (!product) return;
    
    const category = product.category;
    const sizes = categoryOptions[category]?.sizes || [];

    if (sizes.length) setSelectedSize(sizes[Math.floor(sizes.length / 2)]);
    setSelectedColor(0);

    // Check if product is in wishlist via localStorage
    checkWishlistStatus();
  }, [product]);

  const checkWishlistStatus = () => {
    if (!product) return;
    
    // Check localStorage for wishlist IDs
    const wishlistIds = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const isInWishlist = wishlistIds.includes(product.id);
    setWishlist(isInWishlist);
  };

  const handleAddToCart = () => {
    if (!product) return;

    // Get existing cart IDs from localStorage (similar to wishlist)
    const cartIds = JSON.parse(localStorage.getItem('cart') || '[]');

    // Create cart item with ID and selected options
    const cartItem = {
      productId: product.id,
      size: selectedSize || 'N/A',
      color: colors[selectedColor] || 'N/A',
      quantity: quantity,
    };

    // Check if same product with same options already exists
    const existingIndex = cartIds.findIndex(
      (item) =>
        item.productId === cartItem.productId &&
        item.size === cartItem.size &&
        item.color === cartItem.color
    );

    if (existingIndex >= 0) {
      // Update quantity if same item exists
      cartIds[existingIndex].quantity += quantity;
    } else {
      // Add new item to cart
      cartIds.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(cartIds));
    alert(`Added to cart:\n${product.name}\nSize: ${cartItem.size}\nColor: ${cartItem.color}\nQuantity: ${cartItem.quantity}`);
    console.log('✅ Added to cart:', product.name, cartItem);
  };

  const handleAddToWishlist = () => {
    if (!product) return;

    // Get existing wishlist IDs from localStorage
    const wishlistIds = JSON.parse(localStorage.getItem('wishlist') || '[]');

    if (wishlist) {
      alert('Already in Wishlist!');
      return;
    }

    // Add product ID to wishlist
    if (!wishlistIds.includes(product.id)) {
      wishlistIds.push(product.id);
      localStorage.setItem('wishlist', JSON.stringify(wishlistIds));
      setWishlist(true);
      alert('Added to Wishlist!');
      console.log('✅ Added to wishlist:', product.name, product.id);
    }
  };

  const renderStars = (rating) => {
    const avg = Math.floor(rating);
    return [...Array(5)].map((_, i) => (
      <span
        key={i}
        style={{
          color: i < avg ? '#FBBF24' : '#D1D5DB',
          fontSize: '1.25rem',
          marginRight: '2px',
        }}
      >
        {i < avg ? '★' : '☆'}
      </span>
    ));
  };

  if (loading) return <p className="text-[#CC9966]">Loading product details...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!product) return <p className="text-[#CC9966]">Product not found.</p>;

  const sizes = categoryOptions[product.category]?.sizes || [];

  return (
    <div className="max-w-6xl mx-auto p-6 text-[#CC9966]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="rounded-lg overflow-hidden bg-gray-100 h-[340px] w-full">
          <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
        </div>

        <div className="space-y-5">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <div className="flex items-center gap-4">
            {product.originalPrice && (
              <span className="text-xl text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-2xl font-semibold">${product.price.toFixed(2)}</span>
          </div>

          <p className="text-gray-600">{product.description}</p>

          {sizes.length > 0 && (
            <>
              <h3 className="text-sm font-medium">Size:</h3>
              <div className="flex gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 border rounded ${
                      selectedSize === size
                        ? 'bg-[#CC9966] text-white border-[#CC9966]'
                        : 'border-gray-300 text-[#CC9966]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </>
          )}

          <>
            <h3 className="text-sm font-medium">Color:</h3>
            <div className="flex gap-2">
              {colors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColor(index)}
                  className={`w-6 h-6 rounded-full border-2 ${
                    selectedColor === index ? 'border-[#CC9966]' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </>

          <div>
            <h3 className="text-sm font-medium">Quantity:</h3>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-50 text-[#CC9966]"
              >
                –
              </button>
              <span className="w-8 text-center">{quantity.toString().padStart(2, '0')}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-50 text-[#CC9966]"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-2">
            <button
              onClick={handleAddToCart}
              className="bg-[#CC9966] text-white py-2 px-6 rounded hover:bg-[#b9854e]"
            >
              Add To Cart
            </button>
            <button
              onClick={handleAddToWishlist}
              className="px-3 py-2 border rounded text-sm text-[#CC9966] flex items-center gap-1"
            >
              <span className="text-lg" style={{ color: wishlist ? 'red' : '#CC9966' }}>
                {wishlist ? '♥' : '♡'}
              </span>
              {wishlist ? 'In Wishlist' : 'Add Wishlist'}
            </button>
            <span className="text-sm text-gray-400 cursor-pointer">➤ Share This Product</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-4">
        {['details', 'additional', 'reviews'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded ${
              activeTab === tab
                ? 'bg-[#CC9966] text-white'
                : 'bg-white border border-[#CC9966] text-[#CC9966]'
            }`}
          >
            {tab === 'details'
              ? 'Details'
              : tab === 'additional'
              ? 'Additional Information'
              : 'Reviews'}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="text-gray-600">
        {activeTab === 'details' && <p>{product.description}</p>}

        {activeTab === 'additional' &&
          (product.additionalInfo ? (
            Array.isArray(product.additionalInfo) ? (
              product.additionalInfo.map((info, i) => (
                <p key={i} className="mb-2">
                  {info}
                </p>
              ))
            ) : (
              <p>{product.additionalInfo}</p>
            )
          ) : (
            <p>No additional info available.</p>
          ))}

        {activeTab === 'reviews' && (
          <div className="space-y-4">
            {product.reviews?.length > 0 ? (
              product.reviews.map((r, i) => (
                <div key={i} className="border-b pb-2">
                  <div className="font-semibold text-[#CC9966]">{r.name || 'Anonymous'}</div>
                  <div className="flex">{renderStars(r.rating)}</div>
                  <div className="text-sm">{r.comment}</div>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}