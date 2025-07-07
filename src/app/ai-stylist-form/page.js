'use client';
import { useState } from 'react';
import Layout from '../../components/CommonComponents/Layout';
import LoadingSpinner from '../../components/CommonComponents/LoadingSpinner';
import AIStylist from '../../components/AIStylist/PreferenceForm';
import Image from 'next/image';

export default function aistylistformPage() {
  const [loading, setLoading] = useState(false); // Optional, keep if you plan to use

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
      <div className="min-h-screen bg-gray-50 relative">
        <div className="flex flex-col p-6">
          
          {/* Hero Section */}
          <div className="mb-8 relative w-full h-[210px] md:h-[280px] rounded-lg overflow-hidden">
            <Image
              src="/Images/Background image.png"
              alt="Background Image"
              layout="fill"
              objectFit="cover"
              className="absolute top-0 left-0"
            />
            <div className="relative z-10 text-white p-20 text-center font-sans">
              <h1 className="text-5xl font-extrabold tracking-wide mb-4">Preference Form</h1>
              <p className="text-xl font-semibold"></p>
            </div>
          </div>

          {/* AI Stylist Form Section */}
          <AIStylist />
          
        </div>
      </div>
    </Layout>
  );
}
