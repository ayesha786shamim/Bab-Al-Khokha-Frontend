
// src/components/Layout.jsx
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ 
  children, 
  title = "Bab Al Khokha - Your Shopping Destination",
  description = "Discover amazing products at great prices. Quality guaranteed.",
  cartItemsCount = 0 
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="/og-image.jpg" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content="/og-image.jpg" />
      </Head>
      
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header cartItemsCount={cartItemsCount} />
        
        <main className="flex-1">
          {children}
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Layout;