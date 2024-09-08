import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopConext';
import { assets } from '../assets/frontend_assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const subCategoryOptions = {
    Consumables: ["Resistors", "IC Bases", "LED","Wires"],
    Equipment: ["Drills", "Grinders"],
    Components: ["Capacitors", "Transistors"],
    Stations: ["Measuring", "Soldering","Assembly"],
  };

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

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'A-Z':
        setFilterProducts(fpCopy.sort((a, b) => a.name.localeCompare(b.name)));
        break;

      case 'Z-A':
        setFilterProducts(fpCopy.sort((a, b) => b.name.localeCompare(a.name)));
        break;

      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const renderSubCategoryOptions = () => {
    if (category.length === 1) {
      const selectedCategory = category[0];
      const subCategories = subCategoryOptions[selectedCategory];

      if (subCategories) {
        return (
          <div className="border border-gray-300 pl-5 py-3 my-5">
            <p className="mb-3 text-sm font-medium">TYPE</p>
            <div className="flex flex-col gap-2 text-sm font-light">
              {subCategories.map((subCat, index) => (
                <p key={index} className="flex gap-2">
                  <input
                    className="w-3"
                    type="checkbox"
                    value={subCat}
                    onChange={toggleSubCategory}
                  />
                  {subCat}
                </p>
              ))}
            </div>
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10">
      {/* Filter Options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? 'rotate=90' : ''}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>
        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? '' : 'hidden'
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Consumables"}
                checked={category.includes("Consumables")}
                onChange={toggleCategory}
              />
              Consumables
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Components"}
                checked={category.includes("Components")}
                onChange={toggleCategory}
              />
              Components
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Equipment"}
                checked={category.includes("Equipment")}
                onChange={toggleCategory}
              />
              Equipment
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Stations"}
                checked={category.includes("Stations")}
                onChange={toggleCategory}
              />
              Stations
            </p>
          </div>
        </div>

        {/* SubCategory Filter */}
        {renderSubCategoryOptions()}
      </div>
      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text2={"INVENTORY"} />
          {/* Product Sort */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="A-Z">Sort by: A-Z</option>
            <option value="Z-A">Sort by: Z-A</option>
          </select>
        </div>
        {/* Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              image={item.image}
              quantity={item.quantity}
              id={item._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
