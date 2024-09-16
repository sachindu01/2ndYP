import React from "react";
import { products,assets } from "../assets/admin_assets/assets";

const List = () => {
  return (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        {/* ------- List Table Title ---------*/}

        <div className="hidden md:grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Sub Category</b>
          <b>Quantity</b>
          <b className="text-center">Action</b>
        </div>

        {/* ------- Products List ---------*/}

        {products.map((product, index) => (
          <div
            className="grid grid-cols-[1fr_2fr_1fr] md:grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
            key={index}
          >
            <img className="w-12" src={product.image[0]} alt="" />
            <p>{product.name}</p>
            <p>{product.category}</p>
            <p>{product.subCategory}</p>
            <p>{product.quantity}</p>
            <div className="flex justify-center items-center">
          <img
              className="w-4 mr-4 sm:w-5 cursor-pointer"
              src={assets.bin_icon}
              alt=""
            /> 
            </div> 
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
