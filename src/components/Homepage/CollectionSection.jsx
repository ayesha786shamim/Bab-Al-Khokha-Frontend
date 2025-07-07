import Image from 'next/image';
import Link from 'next/link';

const CollectionSection = () => {
  return (
    <div className="bg-white flex flex-col lg:flex-row gap-6 px-4 md:px-10 py-8">

      {/* MEN Collection Card */}
      <div className="relative w-full max-w-[550px] h-[200px] sm:h-[220px] md:h-[250px] rounded-md overflow-hidden mx-auto">
        <Image
          src="/Images/Collection background.png"
          alt="Collection Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 flex flex-col sm:flex-row items-center justify-between px-5 py-4">

          {/* Text */}
          <div className="z-10 text-left max-w-full sm:max-w-[55%]">
            <h2 className="text-xl sm:text-2xl font-bold text-[#b2744c]">Men Collection</h2>
            <p className="text-xs sm:text-sm text-gray-700 mt-1">
              Lorem ipsum is placeholder text commonly used in the graphic.
            </p>
            {/* <Link
              href="/men"
              className="mt-3 inline-block border border-gray-700 text-gray-800 text-xs sm:text-sm px-3 py-1 hover:bg-gray-800 hover:text-white transition"
            >
              SHOP NOW
            </Link> */}
          </div>

          {/* Boy Image */}
          <div className="relative h-[100px] w-[80px] sm:h-full sm:w-[40%] mt-4 sm:mt-0">
            <Image
              src="/Images/Boy image.png"
              alt="Boy"
              fill
              className="object-contain object-bottom"
            />
          </div>
        </div>
      </div>

      {/* WOMEN Collection Card */}
      
      <div className="relative w-full max-w-[550px] h-[200px] sm:h-[220px] md:h-[250px] rounded-md overflow-hidden mx-auto">
        <Image
          src="/Images/Collection background.png"
          alt="Collection Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 flex flex-col sm:flex-row items-center justify-between px-5 py-4">
          {/* Text */}
          <div className="z-10 text-left max-w-full sm:max-w-[55%]">
            <h2 className="text-xl sm:text-2xl font-bold text-[#b2744c]">Women Collection</h2>
            <p className="text-xs sm:text-sm text-gray-700 mt-1">
              Lorem ipsum is placeholder text commonly used in the graphic.
            </p>
            {/* <Link
              href="/women"
              className="mt-3 inline-block border border-gray-700 text-gray-800 text-xs sm:text-sm px-3 py-1 hover:bg-gray-800 hover:text-white transition"
            >
              SHOP NOW
            </Link> */}
          </div>

          {/* Girl Image */}
          <div className="relative h-[100px] w-[80px] sm:h-full sm:w-[40%] mt-4 sm:mt-0">
            <Image
              src="/Images/girl image.png"
              alt="Girl"
              fill
              className="object-contain object-bottom"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionSection;
