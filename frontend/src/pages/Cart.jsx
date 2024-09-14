import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopConext";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];

    for (const itemId in cartItems) {
      const product = cartItems[itemId];
      const productData = products.find((p) => p._id === itemId);

      // Check if product has sizes, colors, or neither
      const hasSizes = productData?.sizes && productData.sizes.length > 0;
      const hasColors = productData?.colors && productData.colors.length > 0;

      // Case 1: Product has both size and color
      if (hasSizes && hasColors) {
        for (const size in product) {
          if (typeof product[size] === "object") {
            for (const color in product[size]) {
              if (product[size][color] > 0) {
                tempData.push({
                  _id: itemId,
                  size: size,
                  color: color,
                  quantity: product[size][color],
                });
              }
            }
          }
        }
      }
      // Case 2: Product has only size
      else if (hasSizes && !hasColors) {
        for (const size in product) {
          if (product[size] > 0) {
            tempData.push({
              _id: itemId,
              size: size,
              quantity: product[size],
            });
          }
        }
      }
      // Case 3: Product has only color
      else if (!hasSizes && hasColors) {
        for (const color in product) {
          if (product[color] > 0) {
            tempData.push({
              _id: itemId,
              color: color,
              quantity: product[color],
            });
          }
        }
      }
      // Case 4: Product has neither size nor color
      else if (!hasSizes && !hasColors) {
        if (product > 0) {
          tempData.push({
            _id: itemId,
            quantity: product, // Direct quantity (no size or color)
          });
        }
      }
    }
    console.log(tempData);
    setCartData(tempData);
  }, [cartItems, products]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>
      <div>
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );
          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr 0.5fr 0.5fr] sm:grid-cols-[4fr 2fr 0.5fr] items-center gap-4"
            >
              {/* Product Details */}
              <div className="flex items-start gap-6">
                <img
                  className="w-16 sm:w-20"
                  src={productData.image[0]}
                  alt=""
                />
                <div>
                  <p className="text-xs sm:text-lg font-medium">
                    {productData.name}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p
                      className={`px-2 sm-px-3 sm:py-1 border bg-slate-50  ${
                        item.size ? "" : "hidden"
                      }`}
                    >
                      {item.size}
                    </p>
                    <p
                      className={`px-2 sm-px-3 sm:py-1 border bg-slate-50  ${
                        item.color ? "" : "hidden"
                      }`}
                    >
                      {item.color}
                    </p>
                  </div>
                </div>
              </div>
              {/* Quantity Input */}
              <div className="flex items-center justify-center">
                <input
                  value={item.quantity}
                  onChange={(e) =>
                    e.target.value === "" || e.target.value === "0"
                      ? null
                      : updateQuantity(
                          item._id,
                          item.size || null,
                          item.color || null,
                          Number(e.target.value)
                        )
                  }
                  className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 transform -translate-y-14"
                  type="number"
                  min={1}
                />
                <img
                  onClick={() =>
                    updateQuantity(
                      item._id,
                      item.size || null,
                      item.color || null,
                      0
                    )
                  }
                  className="w-4 mr-4 sm:w-5 cursor-pointer "
                  src={assets.bin_icon}
                  alt=""
                />
              </div>
              <div></div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-black text-white text-sm my-8 px-8 py-3"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
