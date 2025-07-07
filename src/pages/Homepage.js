// src/pages/index.js (Homepage)
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import HeroBanner from '../components/CommonComponents/HeroBanner';
import ProductGrid from '../components/Homepage/ProductGrid';
import CategoryCard from '../components/Homepage/CategoryCard';
import { devProductAPI, devCategoryAPI } from '../services/api';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newCollection, setNewCollection] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from your .NET API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // These will be replaced with your actual .NET API calls
        const [featured, categories] = await Promise.all([
          devProductAPI.getFeatured(),
          devCategoryAPI.getAll()
        ]);
        
        setFeaturedProducts(featured);
        setNewCollection(featured.slice(0, 4)); // Use first 4 for hero
        setCategories(categories);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = async (product) => {
    try {
      // This will connect to your .NET API later
      console.log('Adding to cart:', product);
      // await cartAPI.addItem(product.id);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleToggleFavorite = async (product) => {
    try {
      // This will connect to your .NET API later
      console.log('Toggle favorite:', product);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  if (loading) {
    return (
      <Layout title="Bab Al Khokha - Your Shopping Destination">
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Bab Al Khokha - Your Shopping Destination">
      {/* Hero Banner */}
      <HeroBanner
        title="New Collection"
        subtitle="Discover our latest arrivals and trending items"
        buttonText="Shop Now"
        buttonLink="/products"
        featuredProducts={newCollection}
      />

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Shop Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <CategoryCard key={category.slug || index} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <ProductGrid
        products={featuredProducts}
        title="Featured Products"
        showBestSeller={true}
        onAddToCart={handleAddToCart}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* Newsletter Section */}
      <section className="bg-amber-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">Subscribe & Get 10% Discount</h2>
          <p className="text-amber-100 mb-8">Get the latest updates on new products and exclusive offers</p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-l-lg sm:rounded-r-none rounded-r-lg border-none outline-none"
            />
            <button className="bg-amber-800 text-white px-6 py-3 rounded-r-lg sm:rounded-l-none rounded-l-lg hover:bg-amber-900 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
