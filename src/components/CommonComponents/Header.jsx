import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  ShoppingCartIcon,
  MagnifyingGlassIcon,
  UserIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';

const Header = ({ cartItemsCount = 0 }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const currentPath = usePathname(); // ✅ FIXED

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const isActive = (path) => currentPath === path;

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3">
        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center bg-white rounded-lg px-3 py-2 ml-4 w-full max-w-md border border-gray-400 focus-within:border-gray-600 transition-colors"
        >
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none ml-3 text-xs sm:text-sm w-full text-gray-700 placeholder-gray-600"
          />
          <button
            type="submit"
            className="ml-3 bg-[#CC9966] text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-[#b38655] transition-colors"
          >
            Search
          </button>
        </form>

        {/* Logo */}
        <div className="flex justify-center items-center w-1/3">
          <Link href="/">
            <Image
              src="/Images/Bab El Khokha LOGO-10 1.png"
              alt="Bab El Khokha Logo"
              width={80}
              height={80}
              className="object-contain mx-auto"
              priority
            />
          </Link>
        </div>

        {/* Icons */}
        <div className="flex justify-end items-center space-x-4 w-1/3">

            <Link
            href="/Auth"
            className={
              (isActive('/Auth') ? 'text-amber-600 font-semibold ' : 'text-gray-700 hover:text-amber-600 ') +
              'flex items-center text-sm'
            }
          >
            <UserIcon className="h-5 w-5 mr-1" />
            Profile
          </Link>

          <Link
            href="/Wishlist"
            className={
              (isActive('/Wishlist') ? 'text-amber-600 font-semibold ' : 'text-gray-700 hover:text-amber-600 ') +
              'flex items-center text-sm'
            }
          >
            <HeartIcon className="h-5 w-5 mr-1" />
            Wishlist
          </Link>

          <Link
            href="/Cart"
            className={
              (isActive('/Cart') ? 'text-amber-600 font-semibold ' : 'text-gray-700 hover:text-amber-600 ') +
              'flex items-center text-sm relative'
            }
          >
            <ShoppingCartIcon className="h-5 w-5 mr-1" />
            Cart
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                {cartItemsCount > 99 ? '99+' : cartItemsCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Navigation Row */}
      <div className="border-t border-gray-200 bg-white">
        <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-700 py-2">
          <Link href="/" className={isActive('/') ? 'text-amber-600 font-semibold' : 'hover:text-amber-600'}>Home</Link>
          <Link href="/BestSeller" className={isActive('/BestSeller') ? 'text-amber-600 font-semibold' : 'hover:text-amber-600'}>Best Sellers</Link>
          <Link href="/TodayDeals" className={isActive('/TodayDeals') ? 'text-amber-600 font-semibold' : 'hover:text-amber-600'}>Today&apos;s Deals</Link>
          <Link href="/Sale" className={isActive('/Sale') ? 'text-amber-600 font-semibold' : 'hover:text-amber-600'}>On Sale</Link>
          <Link href="/Electronics" className={isActive('/Electronics') ? 'text-amber-600 font-semibold' : 'hover:text-amber-600'}>Electronics</Link>
          <Link href="/Fashion" className={isActive('/Fashion') ? 'text-amber-600 font-semibold' : 'hover:text-amber-600'}>Fashion</Link>
          <Link href="/KidsAndToys" className={isActive('/KidsAndToys') ? 'text-amber-600 font-semibold' : 'hover:text-amber-600'}>Kids & Toys</Link>
          <Link href="/Gift" className={isActive('/Gift') ? 'text-amber-600 font-semibold' : 'hover:text-amber-600'}>Gift Cards</Link>
          <Link href="/AboutUs" className={isActive('/AboutUs') ? 'text-amber-600 font-semibold' : 'hover:text-amber-600'}>About Us</Link>
          <Link href="/welcome-ai-stylist" className={isActive('/welcome-ai-stylist') ? 'text-amber-600 font-semibold' : 'hover:text-amber-600'}>AI Stylist</Link>
          <Link href="/ai-stylist-form" className={isActive('/ai-stylist-form') ? 'text-amber-600 font-semibold' : 'hover:text-amber-600'}>Preference Form</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
