import Image from 'next/image';

const HeroBanner = () => {
  return (
    <div className="relative w-full h-[200px] sm:h-[290px] md:h-[350px] lg:h-[450px] overflow-hidden">
      <Image
        src="/Images/Hero.png"
        alt="Hero Banner"
        fill
        className="object-cover"
        priority
      />
    </div>
  );
};

export default HeroBanner;
