import { createContext, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();

  const addToCart = async (itemId, size, color) => {
    // Find the product by its ID
    const product = products.find((item) => item._id === itemId);

    // Check if the product requires size or color selection
    if (product.sizes && product.sizes.length > 0 && !size) {
      toast.error("Please select a size");
      return;
    }

    if (product.colors && product.colors.length > 0 && !color) {
      toast.error("Please select a color");
      return;
    }

    let cartData = structuredClone(cartItems);

    // Check if the product already exists in the cart
    if (cartData[itemId]) {
      // If the product has both size and color, store them accordingly
      if (size && color) {
        if (cartData[itemId][size]) {
          if (cartData[itemId][size][color]) {
            cartData[itemId][size][color] += 1;
          } else {
            cartData[itemId][size][color] = 1;
          }
        } else {
          cartData[itemId][size] = { [color]: 1 };
        }
      }
      // If the product only has size
      else if (size) {
        if (cartData[itemId][size]) {
          cartData[itemId][size] += 1;
        } else {
          cartData[itemId][size] = 1;
        }
      }
      // If the product only has color
      else if (color) {
        if (cartData[itemId][color]) {
          cartData[itemId][color] += 1;
        } else {
          cartData[itemId][color] = 1;
        }
      } else {
        // If neither size nor color is required, just increment the quantity
        cartData[itemId] += 1;
      }
    } else {
      // Add a new product to the cart
      if (size && color) {
        cartData[itemId] = { [size]: { [color]: 1 } };
      } else if (size) {
        cartData[itemId] = { [size]: 1 };
      } else if (color) {
        cartData[itemId] = { [color]: 1 };
      } else {
        cartData[itemId] = 1; // No size or color required
      }
    }

    // Update the cart items state
    setCartItems(cartData);
  };


  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
