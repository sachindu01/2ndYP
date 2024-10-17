import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const [token, setToken] = useState("");

  const addToCart = async (itemId) => {
    let cartData = structuredClone(cartItems);

    // Check if the product already exists in the cart
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }

    // Update the cart items state
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId},
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
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

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  const value = {
    products,
    search,
    setSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    navigate,
    token,
    setToken,
    backendUrl,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
