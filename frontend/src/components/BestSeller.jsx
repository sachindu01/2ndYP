import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopConext';
import Title from './Title';
import ProductItem from './ProductItem';

const RandomProducts = () => {
  const { products } = useContext(ShopContext);
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    // Function to shuffle the products and pick the first 5
    const getRandomProducts = (productsList) => {
      let shuffled = productsList.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 5);
    };

    setRandomProducts(getRandomProducts(products));
  }, [products]);

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'BEST'} text2={'SELLERS'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Check out some of our best sellers!
        </p>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {randomProducts.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default RandomProducts;
