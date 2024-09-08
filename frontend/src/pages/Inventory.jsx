import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopConext';
import { assets } from '../assets/frontend_assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Inventory = () => {

  const { products } = useContext(ShopContext);

  return (
    <div>
      Inventory
    </div>
  )
}

export default Inventory
