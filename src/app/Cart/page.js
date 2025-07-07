'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Layout from '../../components/CommonComponents/Layout';
import LoadingSpinner from '../../components/CommonComponents/LoadingSpinner';
import Cart from '../../components/Cart/CartDetail';
import CheckoutDetail from '../../components/Checkout/CheckoutDetail';
import Image from 'next/image';

export default function CartPage() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('cart'); // 'cart' or 'checkout'

  useEffect(() => {
    // Simple loading delay since we don't need to fetch anything specific for the cart page
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Handler to switch to checkout tab from Cart component
  const handleProceedToCheckout = () => {
    setActiveTab('checkout');
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
      {/* Header */}
      <div className="mb-8 px-4 md:px-8 pt-4 md:pt-6">
        <div className="relative w-full h-[210px] md:h-[270px] rounded-lg overflow-hidden">
          <Image
            src="/Images/Background image.png"
            alt="Background Image"
            fill
            className="object-cover rounded-lg"
          />

          {/* Text Overlay */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white font-sans text-center px-4 md:px-8">
            <h1 className="text-5xl font-extrabold tracking-wide mb-4">Shopping Cart</h1>
            <p className="text-xl font-semibold">Your favorites are just a click away!</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-6">
        <nav className="flex justify-center space-x-4 border-b border-gray-300">
          <button
            onClick={() => setActiveTab('cart')}
            className={`py-3 px-6 font-semibold ${
              activeTab === 'cart'
                ? 'border-b-4 border-[#CC9966] text-[#CC9966]'
                : 'text-gray-600 hover:text-[#CC9966]'
            }`}
            aria-current={activeTab === 'cart' ? 'page' : undefined}
          >
            Shopping Cart
          </button>
          <button
            onClick={() => setActiveTab('checkout')}
            className={`py-3 px-6 font-semibold ${
              activeTab === 'checkout'
                ? 'border-b-4 border-[#CC9966] text-[#CC9966]'
                : 'text-gray-600 hover:text-[#CC9966]'
            }`}
            aria-current={activeTab === 'checkout' ? 'page' : undefined}
          >
            Checkout
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {activeTab === 'cart' ? (
          <Cart onProceedToCheckout={handleProceedToCheckout} />
        ) : (
          <CheckoutDetail />
        )}
      </div>
    </Layout>
  );
}