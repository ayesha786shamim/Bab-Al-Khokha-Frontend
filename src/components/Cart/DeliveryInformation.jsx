import React from 'react';

const DeliveryInformation = ({ deliveryInfo, setDeliveryInfo }) => {
  const handleChange = (e) => {
    setDeliveryInfo({ ...deliveryInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white border border-[#CC9966] rounded-md p-4 mb-6">
      <h2 className="text-lg font-semibold mb-4" style={{ color: '#CC9966' }}>
        Delivery Information
      </h2>
      <div className="space-y-3 text-sm" style={{ color: '#CC9966' }}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name *"
          value={deliveryInfo.fullName}
          onChange={handleChange}
          className="w-full border border-[#CC9966] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#CC9966]"
        />
        <input
          type="email"
          name="emailAddress"
          placeholder="Email Address *"
          value={deliveryInfo.emailAddress}
          onChange={handleChange}
          className="w-full border border-[#CC9966] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#CC9966]"
        />
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number *"
          value={deliveryInfo.phoneNumber}
          onChange={handleChange}
          className="w-full border border-[#CC9966] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#CC9966]"
        />
        <input
          type="text"
          name="companyName"
          placeholder="Company Name (optional)"
          value={deliveryInfo.companyName || ''}
          onChange={handleChange}
          className="w-full border border-[#CC9966] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#CC9966]"
        />
        <input
          type="text"
          name="country"
          placeholder="Country *"
          value={deliveryInfo.country}
          onChange={handleChange}
          className="w-full border border-[#CC9966] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#CC9966]"
        />
        <input
          type="text"
          name="streetAddress"
          placeholder="Street Address *"
          value={deliveryInfo.streetAddress}
          onChange={handleChange}
          className="w-full border border-[#CC9966] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#CC9966]"
        />
        <input
          type="text"
          name="city"
          placeholder="Town / City *"
          value={deliveryInfo.city}
          onChange={handleChange}
          className="w-full border border-[#CC9966] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#CC9966]"
        />
        <input
          type="text"
          name="postCode"
          placeholder="Post Code / ZIP *"
          value={deliveryInfo.postCode}
          onChange={handleChange}
          className="w-full border border-[#CC9966] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#CC9966]"
        />
      </div>
    </div>
  );
};

export default DeliveryInformation;
