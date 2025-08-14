// components/CartButton.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { getCartItemCount, getCartTotal } from '@/utils/cartUtils';
import ShoppingCart from './ShoppingCart';
import { HiShoppingCart } from 'react-icons/hi';

const CartButton: React.FC = () => {
  const [cartCount, setCartCount] = useState<number>(0);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [showCart, setShowCart] = useState<boolean>(false);

  useEffect(() => {
    // Initial load
    updateCartData();

    // Listen for cart updates
    const handleCartUpdate = () => {
      updateCartData();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    window.addEventListener('storage', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('storage', handleCartUpdate);
    };
  }, []);

  const updateCartData = () => {
    setCartCount(getCartItemCount());
    setCartTotal(getCartTotal());
  };

  return (
    <>
      <div 
        onClick={() => setShowCart(true)}
        className="headerItem cursor-pointer relative"
      >
        <HiShoppingCart className="text-xl" />
        <div className="text-xs">
          <p>Cart</p>
          <p className="text-white font-bold">
            ${cartTotal.toFixed(2)}
          </p>
        </div>
        {/* Cart Count Badge */}
        {cartCount > 0 && (
          <span className="absolute -top-1 -left-2 bg-amazonOrange text-amazonBlue text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
            {cartCount > 99 ? '99+' : cartCount}
          </span>
        )}
      </div>

      {/* Shopping Cart Sidebar */}
      <ShoppingCart isOpen={showCart} onClose={() => setShowCart(false)} />
    </>
  );
};

export default CartButton;