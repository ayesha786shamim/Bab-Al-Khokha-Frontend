import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative text-white overflow-hidden">

      {/* Background Image with High Transparency */}
      <div className="absolute inset-0">
        <Image
          src="/Images/Background image.png"
          alt="Footer Background"
          fill
          className="object-cover opacity-90" // Increased transparency
          priority
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 justify-center text-center md:text-left">

          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">About</h3>
            <p className="text-sm mb-4 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p className="font-semibold mb-2">Follow Us</p>
            <div className="flex justify-center md:justify-start space-x-3">
              <Link href="#"><Image src="/Images/instragram.png" alt="Instagram" width={24} height={24} /></Link>
              <Link href="#"><Image src="/Images/tictok.png" alt="TikTok" width={24} height={24} /></Link>
              <Link href="#"><Image src="/Images/linkdin icon.png" alt="LinkedIn" width={24} height={24} /></Link>
              <Link href="#"><Image src="/Images/pintrest.png" alt="Pinterest" width={24} height={24} /></Link>
              <Link href="#"><Image src="/Images/facebook.png" alt="Facebook" width={24} height={24} /></Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:underline">About Us</Link></li>
              <li><Link href="#" className="hover:underline">Shopping</Link></li>
              <li><Link href="#" className="hover:underline">Customer Reviews</Link></li>
              <li><Link href="#" className="hover:underline">Contact Us</Link></li>
              <li><Link href="#" className="hover:underline">Blog</Link></li>
              <li><Link href="#" className="hover:underline">Wishlist</Link></li>
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-xl font-bold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:underline">Men Products</Link></li>
              <li><Link href="#" className="hover:underline">Women Products</Link></li>
              <li><Link href="#" className="hover:underline">Kids Products</Link></li>
              <li><Link href="#" className="hover:underline">Trending Products</Link></li>
              <li><Link href="#" className="hover:underline">Sale Products</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-xl font-bold mb-4">Customer Care</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:underline">Help & FAQs</Link></li>
              <li><Link href="#" className="hover:underline">Return My Order</Link></li>
              <li><Link href="#" className="hover:underline">Refer a Friend</Link></li>
              <li><Link href="#" className="hover:underline">Size Guide</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar Full Width at END */}
      <div className="bg-white w-full text-center py-4 text-xs text-[#CC9966] relative z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2024 - Bab Al Khokha. All rights reserved.</p>
          <p>Designed & Developed by SMB Digital Zone</p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
