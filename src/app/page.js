'use client';

import { useState, useEffect } from 'react';
import Layout from '../components/CommonComponents/Layout';
import HeroBanner from '../components/CommonComponents/HeroBanner';
import ProductGrid from '../components/Homepage/ProductGrid';
import SubscribeSection from '../components/Homepage/SubscribeSection'; 
import LoadingSpinner from '../components/CommonComponents/LoadingSpinner';
import CategoryScroller from '../components/Homepage/CategoryScroller';
import { devProductAPI, categoryAPI } from '../services/api'; // Changed devCategoryAPI to categoryAPI
import CollectionSection from '../components/Homepage/CollectionSection';
import VideoSection from '../components/Homepage/VideoSection';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newCollection, setNewCollection] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch categories directly from your .NET backend
        const categoriesResponse = await fetch('http://localhost:5192/api/categories');
        const categoriesData = await categoriesResponse.json();
        
        console.log('✅ Categories loaded from backend:', categoriesData);
        
        // Fetch featured products
        const featured = await devProductAPI.getFeatured();
        
        setFeaturedProducts(featured);
        setNewCollection(featured.slice(0, 4));
        setCategories(categoriesData);
        
        console.log('✅ Total categories loaded:', categoriesData.length);
      } catch (error) {
        console.error('❌ Error fetching data:', error);
        // Fallback to empty arrays on error
        setFeaturedProducts([]);
        setCategories([]);
        setNewCollection([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = async (product) => {
    console.log('Adding to cart:', product);
  };

  const handleToggleFavorite = async (product) => {
    console.log('Toggle favorite:', product);
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

  return (
    <Layout>
      {/* Hero section */}
      <HeroBanner />

      {/* Collection section */}
      <CollectionSection/>

      {/* Category scroller */}
      <CategoryScroller categories={categories} />

      {/* Video section */}
      <VideoSection videoUrl="https://www.youtube.com/embed/4bJH-zdfASo" />

      <ProductGrid
        products={featuredProducts}
        title="Featured Products"
        showBestSeller={true}
        onAddToCart={handleAddToCart}
        onToggleFavorite={handleToggleFavorite}
      />

       {/* subscribe section */}
      <SubscribeSection/>

    </Layout>
  );
}