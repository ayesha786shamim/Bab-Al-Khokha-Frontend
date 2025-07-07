'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Layout from '../../components/CommonComponents/Layout';
import WishList from '../../components/WishList/Wishlist';
import LoadingSpinner from '../../components/CommonComponents/LoadingSpinner';
import Image from 'next/image';

export default function WishListPage() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');

  const [loading, setLoading] = useState(true);
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const fetchWishlistData = async () => {
      try {
        setLoading(true);
        
        // Get wishlist IDs from localStorage
        const wishlistIds = JSON.parse(localStorage.getItem('wishlist') || '[]');
        
        if (wishlistIds.length === 0) {
          console.log('📝 No items in wishlist');
          setWishlistItems([]);
          return;
        }

        // Fetch all products from backend
        const response = await fetch('http://localhost:5192/api/products');
        
        if (!response.ok) {
          console.log('⚠️ Products endpoint returned:', response.status);
          setWishlistItems([]);
          return;
        }

        const text = await response.text();
        if (!text) {
          console.log('⚠️ Empty response from products endpoint');
          setWishlistItems([]);
          return;
        }

        const data = JSON.parse(text);
        const allProducts = data.products || data || [];
        
        // Filter products that are in wishlist
        const wishlistProducts = allProducts.filter(product => 
          wishlistIds.includes(product.id)
        );
        
        setWishlistItems(wishlistProducts);
        console.log('✅ Loaded', wishlistProducts.length, 'wishlist items from', wishlistIds.length, 'stored IDs');
        
      } catch (error) {
        console.error('❌ Error fetching wishlist:', error);
        console.log('🔧 Using empty wishlist for now');
        setWishlistItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistData();
  }, []);

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
      {/* Header */}
      <div className="mb-8 px-4 md:px-8 pt-4 md:pt-6">
        <div className="relative w-full h-[210px] md:h-[270px] rounded-lg overflow-hidden">
          <Image
            src="/Images/Background image.png"
            alt="Background Image"
            fill
            className="object-cover rounded-lg"
          />

          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white font-sans text-center px-4 md:px-8">
            <h1 className="text-5xl font-extrabold tracking-wide mb-4">WishList</h1>
            <p className="text-xl font-semibold">Keep Track of What Matters Most to You.</p>
          </div>
        </div>
      </div>

      {/* WishList Section */}
      <WishList wishlistItems={wishlistItems} setWishlistItems={setWishlistItems} />
    </Layout>
  );
}