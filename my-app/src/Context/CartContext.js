import React, { createContext, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // Initialize cart as an empty array
  const [totalAmount, setTotalAmount] = useState(0); // Initialize total amount as 0

  const addToCart = (product) => {
    if (!product || typeof product !== "object" || !product.price) {
      console.error("Invalid product object passed to addToCart:", product);
      return;
    }

    setCart((prevCart) => {
      if (!Array.isArray(prevCart)) {
        console.error("Cart state is not an array. Resetting to an empty array.");
        return [{ ...product, quantity: 1 }];
      }

      // Check if the product already exists in the cart
      const existingProductIndex = prevCart.findIndex((item) => item.id === product.id);

      if (existingProductIndex >= 0) {
        // Update the quantity of the existing product
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          quantity: (updatedCart[existingProductIndex].quantity || 1) + 1,
        };
        return updatedCart;
      } else {
        // Add the new product with a quantity of 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    // Update the total amount
    setTotalAmount((prevTotal) => prevTotal + (product.price || 0));

    console.log(`Added to cart: ${product.name}, Price: ${product.price}`);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        totalAmount,
        addToCart,
        setTotalAmount,
        setCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
