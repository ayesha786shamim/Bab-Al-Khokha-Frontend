'use client';

import DeliveryInformation from './DeliveryInformation';
import PaymentMethod from './PaymentMethod';
import { useEffect, useState } from 'react';

export default function CartDetail({ onProceedToCheckout }) {
  const [cartItems, setCartItems] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: '',
    emailAddress: '',
    phoneNumber: '',
    deliveryMethod: '',
    country: '',
    streetAddress: '',
    city: '',
    postCode: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('');

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        setLoading(true);
        
        // Get cart items from localStorage (now contains only IDs + options)
        const cartIds = JSON.parse(localStorage.getItem('cart') || '[]');
        
        if (cartIds.length === 0) {
          console.log('📝 Cart is empty');
          setCartItems([]);
          return;
        }

        // Fetch all products from backend
        const response = await fetch('http://localhost:5192/api/products');
        
        if (!response.ok) {
          console.log('⚠️ Products endpoint returned:', response.status);
          setCartItems([]);
          return;
        }

        const text = await response.text();
        if (!text) {
          console.log('⚠️ Empty response from products endpoint');
          setCartItems([]);
          return;
        }

        const data = JSON.parse(text);
        const allProducts = data.products || data || [];
        setAllProducts(allProducts);
        
        // Match cart items with full product details
        const fullCartItems = cartIds.map(cartItem => {
          const product = allProducts.find(p => p.id === cartItem.productId);
          if (product) {
            return {
              id: `${cartItem.productId}-${cartItem.size}-${cartItem.color}`, // Unique key
              productId: cartItem.productId,
              name: product.name,
              image: product.image,
              price: product.price,
              size: cartItem.size,
              color: cartItem.color,
              quantity: cartItem.quantity
            };
          }
          return null;
        }).filter(Boolean); // Remove null values
        
        setCartItems(fullCartItems);
        console.log('✅ Loaded', fullCartItems.length, 'cart items from', cartIds.length, 'stored IDs');
        
      } catch (error) {
        console.error('❌ Error fetching cart:', error);
        console.log('🔧 Using empty cart for now');
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, []);

  const saveCart = (updatedCartItems) => {
    // Convert back to ID-based format for localStorage
    const cartIds = updatedCartItems.map(item => ({
      productId: item.productId,
      size: item.size,
      color: item.color,
      quantity: item.quantity
    }));
    
    setCartItems(updatedCartItems);
    localStorage.setItem('cart', JSON.stringify(cartIds));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
    } else {
      const updated = cartItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      saveCart(updated);
    }
  };

  const removeItem = (itemId) => {
    const updated = cartItems.filter(item => item.id !== itemId);
    saveCart(updated);
  };

  const calculateSubtotal = (price, quantity) => {
    return (parseFloat(price) * quantity).toFixed(2);
  };

  const getCartSubtotal = () => {
    return cartItems.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0).toFixed(2);
  };

  const shippingFee = 15;
  const deliveryFee = 15;
  const taxFeePercent = 5;

  const calculateTotal = () => {
    const subtotal = parseFloat(getCartSubtotal());
    const taxAmount = subtotal * (taxFeePercent / 100);
    return (subtotal + shippingFee + deliveryFee + taxAmount).toFixed(2);
  };

  const createOrderData = () => {
    const items = cartItems.map(item => ({
      name: item.name,
      category: `${item.size ? 'Size ' + item.size : ''}${item.size && item.color ? ' / ' : ''}${item.color || ''}`.trim(),
      image: item.image || '/placeholder-image.jpg',
      price: `$${(parseFloat(item.price) * item.quantity).toFixed(2)}`
    }));

    const subtotalNum = parseFloat(getCartSubtotal());
    const taxAmount = subtotalNum * (taxFeePercent / 100);
    const totalNum = subtotalNum + shippingFee + deliveryFee + taxAmount;

    return {
      items,
      subtotal: `$${subtotalNum.toFixed(2)}`,
      shipping: `${shippingFee}$ shipping`,
      vat: `${taxFeePercent}% Tax`,
      total: `$${totalNum.toFixed(2)}`
    };
  };

  const handleProceedToCheckout = () => {
    const orderData = createOrderData();
    localStorage.setItem('orderData', JSON.stringify(orderData));
    localStorage.setItem('deliveryInfo', JSON.stringify(deliveryInfo));
    localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod));

    if (onProceedToCheckout) {
      onProceedToCheckout();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-[#CC9966]">Loading cart...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="md:flex md:space-x-8">

          {/* Left side: items + cart totals below */}
          <div className="flex-1 flex flex-col space-y-6">
            <div className="w-full bg-white rounded-lg shadow-sm p-4 md:p-6 overflow-x-auto">
              <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-gray-200 text-sm font-semibold text-[#CC9966]">
                <div className="col-span-5">Items</div>
                <div className="col-span-2">Price</div>
                <div className="col-span-2">Quantity</div>
                <div className="col-span-2">Subtotal</div>
                <div className="col-span-1"></div>
              </div>

              {cartItems.length === 0 ? (
                <div className="py-12 text-center text-gray-500">
                  <p>Your cart is empty</p>
                  <p className="text-sm">Add some items to get started</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 py-4 border-b border-gray-100 items-center"
                  >
                    <div className="md:col-span-5 flex items-center">
                      <img
                        src={item.image || 'https://via.placeholder.com/64x64?text=Product'}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md mr-4"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        {item.size && item.size !== 'N/A' && <p className="text-sm text-gray-500">Size: {item.size}</p>}
                        {item.color && item.color !== 'N/A' && <p className="text-sm text-gray-500">Color: {item.color}</p>}
                      </div>
                    </div>

                    <div className="md:col-span-2 text-gray-900">${item.price.toFixed(2)}</div>

                    <div className="md:col-span-2">
                      <div className="flex items-center border border-[#CC9966] rounded-md text-[#CC9966] font-semibold w-fit text-sm">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 hover:bg-[#f7f0e8]"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="px-2 py-1 min-w-[2rem] text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 hover:bg-[#f7f0e8]"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="md:col-span-2 text-gray-900 font-medium">
                      ${calculateSubtotal(item.price, item.quantity)}
                    </div>

                    <div className="md:col-span-1 text-center">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 font-bold text-lg"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Totals */}
            <div className="w-full bg-white rounded-lg shadow-sm p-6 text-[#CC9966]">
              <h3 className="text-xl font-semibold mb-6">Cart Totals</h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${getCartSubtotal()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shippingFee}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>${deliveryFee}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>{taxFeePercent}%</span>
                </div>
                <hr className="border-[#CC9966]" />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${calculateTotal()}</span>
                </div>
              </div>

              <button
                className="w-full mt-8 py-3 bg-[#CC9966] text-white rounded-lg hover:bg-[#b9854e] transition-colors font-semibold"
                aria-label="Proceed to Checkout"
                onClick={handleProceedToCheckout}
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>

          {/* Right Side: Delivery Info + Payment Method */}
          <div className="w-full max-w-md flex flex-col space-y-6 mt-12 md:mt-0">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <DeliveryInformation deliveryInfo={deliveryInfo} setDeliveryInfo={setDeliveryInfo} />
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <PaymentMethod paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}