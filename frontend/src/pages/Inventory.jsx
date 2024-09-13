import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopConext';
import { assets } from '../assets/frontend_assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Inventory = () => {

  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts,setFilterProducts] = useState([]);
  const [category,setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  const toggleCategory = (e) => {
    const selectedCategory = e.target.value;
    if (category.includes(selectedCategory)) {
      setCategory([]); // Deselect the category if it's already selected
      setSubCategory([]); // Reset subcategory when category is deselected
    } else {
      setCategory([selectedCategory]); // Replace the category with the newly selected one
      setSubCategory([]); // Reset subcategory when a new category is selected
    }
  };

  useEffect(()=>{
    setFilterProducts(products)
  },[])

  useEffect(()=>{
    console.log(category);
  },[category])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10'>
      {/* Filter Options */}
      <div className='min-w-60'> 
      <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2' >FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt=""/>
        </p>
        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
        <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
        <div className="flex flex-col gap-2 text-sm font-light">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Consumables"} checked={category.includes("Consumables")} onChange={toggleCategory}/>Consumables
            </p>
            <p className="flex gap-2">
            <input className="w-3" type="checkbox" value={"Components"} checked={category.includes("Components")} onChange={toggleCategory}/>Components
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Equipment"} checked={category.includes("Equipment")} onChange={toggleCategory}/>Equipment
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Stations"} checked={category.includes("Stations")} onChange={toggleCategory}/>Stations
            </p>
          </div>
        </div>
         {/*SubCategory filter */}
         <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Resistors"} />Resistors
            </p>
            <p className="flex gap-2">
            <input className="w-3" type="checkbox" value={"IC"} />IC
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"LED"} />LED
            </p>

          </div>
        </div>
      </div>
      {/*Right Side*/}
      <div className='flex-1'>
              <div className='flex justify-between text-base sm:text-2xl mb-4'>
                <Title text1={'ALL'} text2={'INVENTORY ITEMS'}/>
              </div>
              {/*Map Products */}
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6'>
                {
                  filterProducts.map((item,index)=>(
                    <ProductItem key={index} name={item.name} image={item.image} price ={item.price} id= {item._id} />
                  ))
                }

              </div>

      </div>
    </div>
  )
}

export default Inventory
