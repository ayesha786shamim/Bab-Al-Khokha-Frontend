
// src/pages/products/[id].js (Product Detail Page)
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Layout from '../../components/Layout';
import ProductGrid from '../../components/Homepage/ProductGrid';
import Breadcrumb from '../../components/Breadcrumb';
import LoadingSpinner from '../../components/CommonComponents/LoadingSpinner';
import { HeartIcon, ShoppingCartIcon, StarIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { devProductAPI } from '../../services/api';

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          setLoading(true);
          
          // Fetch product details from your .NET API
          const productData = await devProductAPI.getById(id);
          
          if (productData) {
            setProduct({
              ...productData,
              images: [
                productData.imageurl,
                productData.imageurl,
                productData.imageurl,
                productData.imageurl
              ].filter(Boolean),
              sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
              colors: ['Blue', 'Black', 'White', 'Gray'],
              features: [
                'Premium quality materials',
                'Comfortable fit',
                'Durable construction',
                'Multiple size options',
                'Easy care instructions'
              ]
            });
            
            // Fetch related products
            const allProducts = await devProductAPI.getAll({ category: productData.category });
            const related = (allProducts.products || allProducts)
              .filter(p => p.id !== id)
              .slice(0, 4);
            setRelatedProducts(related);
          }
        } catch (error) {
          console.error('Error fetching product:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = async () => {
    try {
      setAddingToCart(true);
      // This will connect to your .NET API
      console.log('Adding to cart:', { product, quantity, selectedSize, selectedColor });
      // await cartAPI.addItem(product.id, quantity);
      
      // Show success message
      alert('Added to cart successfully!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart. Please try again.');
    } finally {
      setAddingToCart(false);
    }
  };

  const handleToggleFavorite = async () => {
    try {
      setIsFavorite(!isFavorite);
      console.log('Toggle favorite:', product);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <LoadingSpinner size="xlarge" />
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
          <button 
            onClick={() => router.push('/products')}
            className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
          >
            Browse Products
          </button>
        </div>
      </Layout>
    );
  }

  const breadcrumbItems = [
    { label: 'Products', href: '/products' },
    { label: product.category, href: `/products?category=${product.category}` },
    { label: product.name }
  ];

  return (
    <Layout title={`${product.name} | Bab Al Khokha`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        {/* Best Seller Badge */}
        <div className="text-center mb-8">
          <div className="inline-block bg-amber-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
            BEST SELLER
          </div>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div>
            <div className="relative h-96 mb-4 rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={product.images[selectedImage] || product.imageurl}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-amber-600' : 'border-gray-200'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            
            {/* Rating */}
            {product.review && (
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.review) ? 'fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">
                  {product.review.toFixed(1)} ({product.reviewCount || 0} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xl text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

            {/* Size Selection */}
            {product.sizes && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg transition-colors ${
                        selectedSize === size
                          ? 'border-amber-600 bg-amber-50 text-amber-600'
                          : 'border-gray-300 hover:border-amber-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border rounded-lg transition-colors ${
                        selectedColor === color
                          ? 'border-amber-600 bg-amber-50 text-amber-600'
                          : 'border-gray-300 hover:border-amber-300'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 rounded-lg hover:border-amber-300 flex items-center justify-center"
                >
                  -
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-300 rounded-lg hover:border-amber-300 flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mb-6">
              <button 
                onClick={handleAddToCart}
                disabled={addingToCart || !product.inStock}
                className="flex-1 bg-amber-600 text-white py-3 px-6 rounded-lg hover:bg-amber-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {addingToCart ? (
                  <>
                    <LoadingSpinner size="small" color="white" />
                    <span>Adding...</span>
                  </>
                ) : (
                  <>
                    <ShoppingCartIcon className="h-5 w-5" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
              
              <button
                onClick={handleToggleFavorite}
                className="p-3 border border-gray-300 rounded-lg hover:border-amber-300 transition-colors"
              >
                {isFavorite ? (
                  <HeartIconSolid className="h-6 w-6 text-red-500" />
                ) : (
                  <HeartIcon className="h-6 w-6 text-gray-400" />
                )}
              </button>
            </div>

            {/* Features */}
            {product.features && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <ProductGrid
            products={relatedProducts}
            title="You might also like"
            onAddToCart={async (product) => console.log('Add to cart:', product)}
            onToggleFavorite={async (product) => console.log('Toggle favorite:', product)}
          />
        )}
      </div>
    </Layout>
  );
}