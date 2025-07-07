import React from 'react';

const paymentMethods = [
  { name: "Mastercard", src: "/Images/Payment1.png" },
  { name: "Visa", src: "/Images/Payment2.png" },
  { name: "GPay", src: "/Images/Payment3.png" },
  { name: "Apple Pay", src: "/Images/Payment4.png" },
  { name: "PayPal", src: "/Images/Payment5.png" },
  { name: "Cash on Delivery", src: "/Images/Payment6.png" }
];

const PaymentMethod = () => {
  return (
    <div className="bg-white border border-[#CC9966] rounded-md p-4">
      <h2 className="text-lg font-semibold mb-4 text-[#CC9966]">Payment Method</h2>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {paymentMethods.map((method, i) => (
          <div
            key={i}
            className="border border-[#CC9966] rounded-md p-2 flex items-center justify-center bg-gray-50 hover:shadow-md cursor-pointer transition-shadow"
            role="button"
            tabIndex={0}
            aria-label={`Select ${method.name} payment method`}
          >
            <img
              src={method.src}
              alt={method.name}
              className="h-8 object-contain"
            />
          </div>
        ))}
      </div>

      <p className="text-xs text-[#CC9966] mb-2">
        Pay securely through pay tabs secure servers.
      </p>

      <label className="flex items-center text-xs text-[#CC9966]">
        <input
          type="checkbox"
          className="mr-2 border-[#CC9966] focus:ring-[#CC9966]"
        />
        I have read and agree to the terms and conditions.
      </label>
    </div>
  );
};

export default PaymentMethod;
