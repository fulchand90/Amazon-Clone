// components/ShoppingCart.tsx
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCartItems, updateCartQuantity, removeFromCart, getCartTotal } from '@/utils/cartUtils';
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

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      loadCartItems();
    }
  }, [isOpen]);

  const loadCartItems = (): void => {
    const items = getCartItems();
    setCartItems(items);
    setTotal(getCartTotal());
  };

  const handleQuantityChange = (productId: string | number, newQuantity: number): void => {
    const updatedCart = updateCartQuantity(productId, newQuantity);
    setCartItems(updatedCart);
    setTotal(getCartTotal());
  };

  const handleRemoveItem = (productId: string | number): void => {
    const updatedCart = removeFromCart(productId);
    setCartItems(updatedCart);
    setTotal(getCartTotal());
  };

  const handleCheckout = (): void => {
    onClose();
    router.push('/checkout');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-800">Shopping Cart</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8m-8 0a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4z"></path>
                </svg>
                <p className="text-gray-500">Your cart is empty</p>
                <button 
                  onClick={onClose}
                  className="mt-4 text-blue-600 hover:text-blue-800"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                    <div className="w-16 h-16 relative overflow-hidden rounded-md bg-gray-100">
                      <Image 
                        src={item.image || '/placeholder-image.png'} 
                        alt={item.name || 'Product image'}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800 text-sm line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="text-green-600 font-semibold">₹{item.price?.toFixed(2)}</p>
                      
                      <div className="flex items-center space-x-2 mt-2">
                        <button 
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded text-sm hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="text-sm font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded text-sm hover:bg-gray-100"
                        >
                          +
                        </button>
                        <button 
                          onClick={() => handleRemoveItem(item.id)}
                          className="ml-2 text-red-600 hover:text-red-800 text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-lg font-bold text-green-600">₹{total.toFixed(2)}</span>
              </div>
              
              <button 
                onClick={handleCheckout}
                className="w-full bg-yellow-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-yellow-600 transition-colors"
              >
                Proceed to Checkout ({cartItems.length} items)
              </button>
              
              <button 
                onClick={onClose}
                className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;