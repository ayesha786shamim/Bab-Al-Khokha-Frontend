'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function SubscribeSection() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log('Subscribed with email:', email);
    // Add your subscription logic here (e.g., API call, toast, etc.)
  };

  return (
    <section className="bg-[#FFFBF4] py-16">
      <div className="max-w-xl mx-auto text-center px-4">
        <h2 className="text-2xl font-bold text-[#003366] mb-6">
          Subscribe & Get 10% Discount
        </h2>

        <form
          onSubmit={handleSubscribe}
          className="flex items-center bg-white rounded-lg px-3 py-2 w-full max-w-md mx-auto border border-gray-400 focus-within:border-gray-600 transition-colors"
        >
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent border-none outline-none ml-3 text-sm w-full text-gray-700 placeholder-gray-600"
            required
          />
          <button
            type="submit"
            className="ml-3 bg-[#CC9966] text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-[#b38655] transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
