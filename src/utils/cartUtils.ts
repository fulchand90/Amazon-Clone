// utils/cartUtils.ts

interface Product {
  id: string | number;
  name?: string;
  title?: string;
  price?: number;
  amount?: number;
  image?: string;
}

interface CartItem extends Product {
  quantity: number;
}

// Add item to cart
export const addToCart = (product: Product, quantity: number = 1): CartItem[] => {
  try {
    const existingCart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if item already exists in cart
    const existingItemIndex = existingCart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex > -1) {
      // Update quantity if item exists
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      existingCart.push({
        id: product.id,
        name: product.name || product.title,
        price: product.price || product.amount,
        image: product.image,
        quantity: quantity
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(existingCart));
    return existingCart;
  } catch (error) {
    console.error('Error adding to cart:', error);
    return [];
  }
};

// Remove item from cart
export const removeFromCart = (productId: string | number): CartItem[] => {
  try {
    const existingCart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = existingCart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    return updatedCart;
  } catch (error) {
    console.error('Error removing from cart:', error);
    return [];
  }
};

// Update item quantity in cart
export const updateCartQuantity = (productId: string | number, quantity: number): CartItem[] => {
  try {
    const existingCart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
    const itemIndex = existingCart.findIndex(item => item.id === productId);
    
    if (itemIndex > -1) {
      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        existingCart.splice(itemIndex, 1);
      } else {
        existingCart[itemIndex].quantity = quantity;
      }
    }
    
    localStorage.setItem('cart', JSON.stringify(existingCart));
    return existingCart;
  } catch (error) {
    console.error('Error updating cart quantity:', error);
    return [];
  }
};

// Get cart items
export const getCartItems = (): CartItem[] => {
  try {
    return JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[];
  } catch (error) {
    console.error('Error getting cart items:', error);
    return [];
  }
};

// Get cart total
export const getCartTotal = (): number => {
  try {
    const cartItems = getCartItems();
    return cartItems.reduce((total, item) => {
      return total + ((item.price || 0) * (item.quantity || 1));
    }, 0);
  } catch (error) {
    console.error('Error calculating cart total:', error);
    return 0;
  }
};

// Get cart item count
export const getCartItemCount = (): number => {
  try {
    const cartItems = getCartItems();
    return cartItems.reduce((count, item) => count + (item.quantity || 1), 0);
  } catch (error) {
    console.error('Error getting cart item count:', error);
    return 0;
  }
};

// Clear entire cart
export const clearCart = (): CartItem[] => {
  try {
    localStorage.removeItem('cart');
    return [];
  } catch (error) {
    console.error('Error clearing cart:', error);
    return [];
  }
};