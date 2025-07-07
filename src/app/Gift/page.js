'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Layout from '../../components/CommonComponents/Layout';
import LoadingSpinner from '../../components/CommonComponents/LoadingSpinner';
import Card from '../../components/GiftCard/Card';
import { devProductAPI, devCategoryAPI } from '../../services/api';
import Image from 'next/image';

export default function GiftPage() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Optional: fetch categories or featured if needed
        await Promise.all([
          devProductAPI.getFeatured(),
          devCategoryAPI.getAll(),
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />

          {/* Text Overlay */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white font-sans text-center px-4 md:px-8">
            <h1 className="text-5xl font-extrabold tracking-wide mb-4">Gift Cards</h1>
            <p className="text-xl font-semibold">Unlock Joy with Every Click!</p>
          </div>
        </div>
      </div>

      {/* Gift Card Section */}
      <Card/>
    </Layout>
  );
}
