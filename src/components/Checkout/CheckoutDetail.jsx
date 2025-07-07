'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function CheckoutDetail() {
  const [orderData, setOrderData] = useState(null);
  const [deliveryInfo, setDeliveryInfo] = useState(null);

  useEffect(() => {
    const storedOrderData = JSON.parse(localStorage.getItem('orderData'));
    const storedDeliveryInfo = JSON.parse(localStorage.getItem('deliveryInfo'));

    setOrderData(storedOrderData);
    setDeliveryInfo(storedDeliveryInfo);
  }, []);

  if (!orderData) {
    return <div className="text-center py-8">No order data found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Success Tick */}
      <div className="flex justify-center mb-8">
        <Image
          src="/Images/Confirm.png"
          alt="Success"
          width={64}
          height={64}
          className="object-contain"
        />
      </div>

      <h2 className="text-center text-3xl font-semibold mb-10 text-[#CC9966]">
        Your order is completed!
      </h2>

      {/* Ordered Items */}
      <section className="max-w-3xl mx-auto space-y-5 mb-10">
        {orderData.items.map((item, index) => (
          <div
            key={index}
            className={`flex justify-between items-center rounded p-4 border ${
              index === 0 ? 'border-[#CC9966] border-2' : 'border-gray-200'
            }`}
          >
            <div className="flex items-center space-x-5">
              <Image
                src={item.image}
                alt={item.name}
                width={56}
                height={56}
                className="rounded object-cover"
              />
              <div>
                <h4 className="font-semibold text-lg text-[#CC9966] ">{item.name}</h4>
                <p className="text-sm text-gray-500">{item.category}</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm font-medium text-[#CC9966]">Price</p>
              <p className="text-gray-600">{item.price}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Delivery Information */}
      <section className="max-w-3xl mx-auto mb-10 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-[#CC9966]">Delivery Information</h3>
        {deliveryInfo ? (
          <div className="text-sm space-y-2 text-gray-700">
            <p><strong>Name:</strong> {deliveryInfo.fullName}</p>
            <p><strong>Email:</strong> {deliveryInfo.emailAddress}</p>
            <p><strong>Phone:</strong> {deliveryInfo.phoneNumber}</p>
            <p><strong>Method:</strong> {deliveryInfo.deliveryMethod}</p>
            <p>
              <strong>Address:</strong> {deliveryInfo.streetAddress}, {deliveryInfo.city}, {deliveryInfo.country} - {deliveryInfo.postCode}
            </p>
          </div>
        ) : (
          <p>No delivery info available.</p>
        )}
      </section>

      {/* Order Summary */}
      <section className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md text-[#CC9966] font-semibold">
        <div className="mb-2 flex justify-between">
          <span>Subtotal:</span>
          <span>{orderData.subtotal}</span>
        </div>
        <div className="mb-2 flex justify-between">
          <span>Shipping:</span>
          <span>{orderData.shipping}</span>
        </div>
        <div className="mb-4 flex justify-between">
          <span>VAT:</span>
          <span>{orderData.vat}</span>
        </div>
        <div className="text-lg font-bold flex justify-between">
          <span>Total:</span>
          <span>{orderData.total}</span>
        </div>
      </section>
    </div>
  );
}
