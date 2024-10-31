import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopConext";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, addToCart} = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");

  const fetchProductData = () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
      return null;
    });
  };


  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/*Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/*-------Product Image----------*/}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt={`Product thumbnail ${index + 1}`}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img
              className="w-full h-auto object-cover"
              src={image}
              alt="Product"
            />
          </div>
        </div>

        {/*-------------Product Info--------*/}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>

          <p className="mt-5 text-3xl font-medium text-sm">
            {productData.availability && productData.quantity > 0 ? (
              <span className="text-green-600">IN STOCK</span>
            ) : (
              <span className="text-red-500">OUT OF STOCK</span>
            )}
          </p>

          <p className="mt-5 mb-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <p className="mt-5 mb-5 text-gray-500 md:w-4/5">
            Available quantity : {productData.quantity}
          </p>

          {/* Colors Section (Only show if colors exist)
           {productData.colors && productData.colors.length > 0 && (
            <div className='flex flex-col gap-4 my-8'>
              <p>Select Color</p>
              <div className='flex gap-2'>
                {productData.colors.map((item, index) => (
                  <button
                    onClick={() => setColor(item)}
                    className={`border py-2 px-4 bg-gray-100 ${
                      item === color ? 'border-orange-500' : ''
                    }`}
                    key={index}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )} */}

          <button
            onClick={() => addToCart(productData._id,productData.quantity)}
            className={`bg-black text-white px-8 py-3 text-sm ${
              productData.quantity === 0
                ? "bg-gray-500 cursor-not-allowed"
                : "active:bg-gray-700 hover:bg-green-700"
            }`}
            disabled={!productData.availability || productData.quantity === 0}
          >
            {productData.availability && productData.quantity > 0
              ? "ADD TO CART"
              : "OUT OF STOCK"}
          </button>

          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>Must be returned within the allocated time period</p>
          </div>
        </div>
      </div>

      {/*----Display related products---- */}
      <RelatedProducts
        category={productData.category}
        subcategory={productData.subcategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
