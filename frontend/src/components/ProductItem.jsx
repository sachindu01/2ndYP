import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopConext'
import { Link } from 'react-router-dom';

const ProductItem = ({id,image,name,quantity,available}) => {

    const {currency} = useContext(ShopContext);

  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
        <div className='overflow-hidden'>
            <img className='hover:scale-110 transition ease-in-out' src={image[0]} alt=""/>
        </div>
        <p className='pt-3 pb-1 text-sm text-center'>{name}</p>
        


    </Link>
  )
}

export default ProductItem