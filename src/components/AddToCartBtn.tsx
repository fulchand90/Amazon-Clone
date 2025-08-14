// components/AddToCartBtn.tsx
"use client"
import React, { useState, useEffect } from "react";
import { Product } from "../../type";
import { addToCart, getCartItems, updateCartQuantity } from "@/utils/cartUtils";

interface Props {
  product: Product;
}

const AddToCartBtn = ({ product }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    // Check if product is already in cart
    const cartItems = getCartItems();
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setIsInCart(true);
      setCartQuantity(existingItem.quantity);
    } else {
      setIsInCart(false);
      setCartQuantity(0);
    }
  }, [product.id]);

  const handleAddToCart = async () => {
    setIsLoading(true);
    
    try {
      // Convert your Product type to our cart format
      const cartItem = {
        id: product.id,
        name: product.title,
        title: product.title,
        price: product.price,
        image: product.images?.[0] || '',
        category: product.category,
        description: product.description
      };

      addToCart(cartItem, 1);
      
      // Update local state
      setIsInCart(true);
      setCartQuantity(prev => prev + 1);

      // Dispatch custom event to update cart count in header
      window.dispatchEvent(new Event('cartUpdated'));
      
      // Optional: Show success feedback (you can customize this)
      // Could integrate with your existing toast/notification system
      
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity <= 0) {
      // Remove from cart
      updateCartQuantity(product.id, 0);
      setIsInCart(false);
      setCartQuantity(0);
    } else {
      // Update quantity
      updateCartQuantity(product.id, newQuantity);
      setCartQuantity(newQuantity);
    }
    
    // Dispatch event to update cart count
    window.dispatchEvent(new Event('cartUpdated'));
  };

  if (isInCart) {
    // Show quantity controls when item is in cart
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center border border-gray-300 rounded">
          <button
            onClick={() => handleUpdateQuantity(cartQuantity - 1)}
            className="px-3 py-1 hover:bg-gray-100 border-r border-gray-300 text-lg font-medium"
            disabled={isLoading}
          >
            −
          </button>
          <span className="px-3 py-1 font-medium min-w-[40px] text-center">
            {cartQuantity}
          </span>
          <button
            onClick={() => handleUpdateQuantity(cartQuantity + 1)}
            className="px-3 py-1 hover:bg-gray-100 border-l border-gray-300 text-lg font-medium"
            disabled={isLoading}
          >
            +
          </button>
        </div>
        <span className="text-sm text-green-600 font-medium">In Cart</span>
      </div>
    );
  }

  // Default Add to Cart button (keeping your existing styles)
  return (
    <button
      onClick={handleAddToCart}
      disabled={isLoading}
      className={`w-full py-2 px-4 rounded font-medium transition-colors duration-200 ${
        isLoading
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-amazonYellow hover:bg-amazonYellow/80 text-black'
      }`}
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          Adding...
        </div>
      ) : (
        'Add to Cart'
      )}
    </button>
  );
};

export default AddToCartBtn;