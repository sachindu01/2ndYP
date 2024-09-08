import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopConext';
import { assets } from '../assets/frontend_assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  const fetchProductData = () => {
    const foundProduct = products.find((item) => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image[0]);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/*-------Product Image----------*/}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                alt={`Product thumbnail ${index + 1}`}
              />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto object-cover' src={image} alt="Product" />
          </div>
        </div>

        {/*-------------Product Info--------*/}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <p className='mt-5 font-medium'>Available Quantity: {productData.quantity}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>
            {productData.description.split(',').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index < productData.description.split(',').length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
          <p><br/></p>

          {/* Conditional Size Selection */}
          {productData.sizes && productData.sizes.length > 0 && (
            <div className='flex flex-col gap-4 my-8'>
              <p>Select Type</p>
              <div className='flex gap-2'>
                {productData.sizes.map((item, index) => (
                  <button
                    onClick={() => setSize(item)}
                    className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`}
                    key={index}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => addToCart(productData._id, size)}
            className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'
          >
            ADD TO CART
          </button>

          <hr className='mt-8 sm:w-4/5'/>
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>Must be returned within the allocated time period</p>
            <p>Items should be gathered within 3 days</p>
            <p>Must be used with caution</p>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>Dummy text about description</p>
          <p>E-commerce sites usually describe</p>
        </div>
      </div>

      {/*----Display related products---- */}
      <RelatedProducts category={productData.category} subcategory={productData.subCategory} />
    </div>
  ) : <div className='opacity-0'></div>;
};

export default Product;
