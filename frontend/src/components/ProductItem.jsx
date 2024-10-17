import React, { useContext } from "react";
import { ShopContext } from "../context/ShopConext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, availability}) => {

  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
      <div className="overflow-hidden">
        <img
          className="hover:scale-110 transition ease-in-out"
          src={image[0]}
          alt=""
        />
      </div>
      <p className="pt-3 pb-1 text-sm font-medium text-center">{name}</p>

      <p className="text-xs text-center ">
        {availability ? "In Stock" : "Out of Stock"}
      </p>
    </Link>
  );
};

export default ProductItem;
