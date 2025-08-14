// app/checkout/page.tsx
'use client';
import { useState, useEffect } from 'react';
import PaymentOptions from '@/components/PaymentOptions';
import Image from 'next/image';

interface CartItem {
  id: string | number;
  name?: string;
  title?: string;
  price?: number;
  amount?: number;
  quantity: number;
  image?: string;
}

export default function CheckoutPage(): JSX.Element {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Get cart items from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const items: CartItem[] = JSON.parse(savedCart);
      setCartItems(items);
      
      // Calculate total amount
      const total = items.reduce((sum, item) => {
        return sum + ((item.price || item.amount || 0) * (item.quantity || 1));
      }, 0);
      setTotalAmount(total);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">Add some items to your cart to proceed with checkout</p>
          <a 
            href="/"
            className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-yellow-600 transition-colors"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Cart Summary */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {cartItems.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                  <Image 
                    src={item.image || '/placeholder-image.png'} 
                    width={300} 
                    height={400}
                    alt={item.name || item.title || 'Product image'}

                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 line-clamp-2">
                      {item.name || item.title || 'Product'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity || 1}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">
                      ₹{((item.price || item.amount || 0) * (item.quantity || 1)).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600">
                      ₹{(item.price || item.amount || 0).toFixed(2)} each
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4 mt-6">
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Total:</span>
                <span className="text-green-600">₹{totalAmount.toFixed(2)}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {cartItems.length} item{cartItems.length > 1 ? 's' : ''} in your cart
              </p>
            </div>
          </div>

          {/* Payment Options */}
          <div>
            <PaymentOptions cartItems={cartItems} totalAmount={totalAmount} />
          </div>
        </div>
      </div>
    </div>
  );
}