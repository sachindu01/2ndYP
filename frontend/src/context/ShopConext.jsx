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

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  const getCartCount = () => {
    let totalCount = 0;

    // Loop through each product in the cart
    for (const itemId in cartItems) {
      const product = cartItems[itemId];

      // If product is an object (has size, color, or both)
      if (typeof product === "object") {
        for (const key in product) {
          // If the product has both size and color (nested objects)
          if (typeof product[key] === "object") {
            for (const subKey in product[key]) {
              try {
                if (product[key][subKey] > 0) {
                  totalCount += product[key][subKey];
                }
              } catch (error) {
                console.error(
                  "Error calculating cart count for size/color:",
                  error
                );
              }
            }
          } else {
            // If it has only size or only color (no nesting)
            try {
              if (product[key] > 0) {
                totalCount += product[key];
              }
            } catch (error) {
              console.error(
                "Error calculating cart count for size/color:",
                error
              );
            }
          }
        }
      } else {
        // If neither size nor color (just a direct quantity)
        try {
          if (product > 0) {
            totalCount += product;
          }
        } catch (error) {
          console.error(
            "Error calculating cart count for product without size/color:",
            error
          );
        }
      }
    }

    return totalCount;
  };

  const updateQuantity = async (itemId, size, color, quantity) => {
    let cartData = structuredClone(cartItems);

    // If the product has both size and color
    if (size && color) {
      if (cartData[itemId]?.[size]?.[color]) {
        if (quantity === 0) {
          delete cartData[itemId][size][color];
          // Remove the size if no colors remain
          if (Object.keys(cartData[itemId][size]).length === 0) {
            delete cartData[itemId][size];
          }
          // Remove the item if no sizes remain
          if (Object.keys(cartData[itemId]).length === 0) {
            delete cartData[itemId];
          }
        } else {
          cartData[itemId][size][color] = quantity;
        }
      }
    }

    // If the product has only size
    else if (size) {
      if (cartData[itemId]?.[size]) {
        if (quantity === 0) {
          delete cartData[itemId][size];
          // If no sizes remain, delete the item
          if (Object.keys(cartData[itemId]).length === 0) {
            delete cartData[itemId];
          }
        } else {
          cartData[itemId][size] = quantity;
        }
      }
    }
    // If the product has only color
    else if (color) {
      if (cartData[itemId]?.[color]) {
        if (quantity === 0) {
          delete cartData[itemId][color];
          // If no colors remain, delete the item
          if (Object.keys(cartData[itemId]).length === 0) {
            delete cartData[itemId];
          }
        } else {
          cartData[itemId][color] = quantity;
        }
      }
    }

    // If the product has neither size nor color
    else {
      if (cartData[itemId]) {
        if (quantity === 0) {
          delete cartData[itemId];
        } else {
          cartData[itemId] = quantity;
        }
      }
    }

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
