"use client";

const VideoSection = ({ videoUrl }) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-[#CC9966] mb-12">
          Watch Our Video
        </h2>
        <div className="relative w-full" style={{ paddingTop: '36.25%' /* 16:9 aspect ratio */ }}>
          <iframe
            src={videoUrl}
            title="Video Player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full rounded-md shadow-lg"
            frameBorder="0"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
