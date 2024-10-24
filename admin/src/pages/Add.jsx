import React, { useState } from "react";
import { assets } from "../assets/admin_assets/assets";
import axios from 'axios';
import {backendUrl} from '../App';
import { toast } from "react-toastify";

const Add = ({token}) => {

  const [image1,setImage1] = useState(false);
  const [image2,setImage2] = useState(false);
  const [image3,setImage3] = useState(false);
  const [image4,setImage4] = useState(false);

  const [name,setName] = useState("");
  const [description,setDescription] = useState("");
  const [quantity,setQuantity] = useState("");
  // const [colors,setColors] = useState([]);
  
  const [category,setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  // // Variants
  // const [variants, setVariants] = useState([{ name: "", quantity : "" }]);

  //  // Handle variant changes
  //  const handleVariantChange = (index, field, value) => {
  //   const newVariants = [...variants];
  //   newVariants[index][field] = value;
  //   setVariants(newVariants);
  // };

  // // Add new variant field
  // const addVariant = () => {
  //   setVariants([...variants, { name: "", quantity: "" }]);
  // };

  //   // Remove a variant
  //   const removeVariant = (index) => {
  //     const newVariants = variants.filter((_, i) => i !== index);
  //     setVariants(newVariants);
  //   };


  const subCategoryOptions = {
    Consumables: ["Resistors", "IC Bases", "LEDs","Wires"],
    Equipment: ["Power Tools","Soldering Tools","Safety Equipment"],
    Components: ["Development Boards","Sensors","Motors"],
    Stations: ["Measuring", "Soldering","Assembly"],
  };

   // Get subcategories based on selected category
   const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSubCategory(""); // Reset subcategory when category changes
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {

      const formData = new FormData()

      formData.append("name",name);
      formData.append("description",description);
      formData.append("quantity",quantity);
      formData.append("category",category);
      formData.append("subCategory",subCategory);
      formData.append("availability","true")
      // formData.append("colors",JSON.stringify(colors));
      // formData.append("variants", JSON.stringify(variants));

      image1 && formData.append("image1",image1)
      image2 && formData.append("image1",image2)
      image3 && formData.append("image1",image3)
      image4 && formData.append("image1",image4)

      const response = await axios.post(backendUrl + "/api/product/add",formData,{headers:{token}});

      if(response.data.success){
        toast.success(response.data.message);
        setName('');
        setDescription('');
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setQuantity('');
      } else {
        toast.error(response.data.message);
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }

  }

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full item-start gap-3">
      <div>
        <p className="mb-2">Upload Image</p>

        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20 cursor-pointer"
              src={!image1 ? assets.upload_area: URL.createObjectURL(image1)}
              alt=""
            />
            <input onChange={(e)=> setImage1(e.target.files[0])} type="file" id="image1" hidden />
          </label>
          <label htmlFor="image2">
            <img
              className="w-20 cursor-pointer"
              src={!image2 ? assets.upload_area: URL.createObjectURL(image2)}
              alt=""
            />
            <input onChange={(e)=> setImage2(e.target.files[0])}  type="file" id="image2" hidden />
          </label>
          <label htmlFor="image3">
            <img
              className="w-20 cursor-pointer"
              src={!image3 ? assets.upload_area: URL.createObjectURL(image3)}
              alt=""
            />
            <input onChange={(e)=> setImage3(e.target.files[0])} type="file" id="image3" hidden />
          </label>
          <label htmlFor="image4">
            <img
              className="w-20 cursor-pointer"
              src={!image4 ? assets.upload_area: URL.createObjectURL(image4)}
              alt=""
            />
            <input onChange={(e)=> setImage4(e.target.files[0])}  type="file" id="image4" hidden />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          onChange={(e) => setName(e.target.value) }
          value={name}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value) }
          value={description}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Write content here"
          required
        />
      </div>

      {/* Product Category and Subcategory */}
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select className="w-full px-3 py-2"
            value={category}
            onChange={handleCategoryChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Consumables">Consumables</option>
            <option value="Components">Components</option>
            <option value="Equipment">Equipment</option>
            <option value="Stations">Stations</option>
          </select>
        </div>

        {/* Subcategory Dropdown */}
        <div>
          <p className="mb-2">Product Sub Category</p>
          <select className="w-full px-3 py-2"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            required
          >
            <option value="">Select Sub Category</option>
            {category &&
              subCategoryOptions[category].map((sub, index) => (
                <option key={index} value={sub}>
                  {sub}
                </option>
              ))}
            
          </select>
        </div>

        <div>
          <p className="mb-2">Quantity</p>
          <input
            onChange={(e) => setQuantity(e.target.value) }
            value={quantity}
            className="w-full px-3 py-2 sm:w-[120px]"
            type="Number"
            placeholder="1"
            min="1"
            required
          />
        </div>
      </div>

      {/* <div>
        <p className="mb-2">Product Color</p>
        <div className="flex gap-3">
          <div onClick={() => setColors(prev => prev.includes("Red") ? prev.filter(item => item !== "Red") : [...prev,"Red"])}>
            <p className={`${colors.includes("Red") ? "bg-yellow-400" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>Red</p>
          </div>
         <div onClick={() => setColors(prev => prev.includes("Black") ? prev.filter(item => item !== "Black") : [...prev,"Black"])}>
            <p className={`${colors.includes("Black") ? "bg-yellow-400" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>Black</p>
          </div>
          <div onClick={() => setColors(prev => prev.includes("Blue") ? prev.filter(item => item !== "Blue") : [...prev,"Blue"])}>
            <p className={`${colors.includes("Blue") ? "bg-yellow-400" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>Blue</p>
          </div>
          <div onClick={() => setColors(prev => prev.includes("Green") ? prev.filter(item => item !== "Green") : [...prev,"Green"])}>
            <p className={`${colors.includes("Green") ? "bg-yellow-400" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>Green</p>
          </div>
        </div>
      </div> */}

      {/* <div className="flex gap-2 mt-2">
        <input 
        onChange={() => setAvailability(prev => !prev)}
        checked={availability}
        type="checkbox" id='availablity'/>
        <label className="cursor-pointer" htmlFor="availablity"> Available </label>
      </div> */}

       {/* Product Variants
       <div className="w-full">
        <p className="mb-2">Product Variants</p>
        {variants.map((variant, index) => (
          <div key={index} className="flex gap-4 mb-2">
            <input
              type="text"
              className="w-1/2 px-3 py-2"
              placeholder="Variant Name (e.g., 12-pin IC)"
              value={variant.name}
              onChange={(e) => handleVariantChange(index, "name", e.target.value)}
            />
            <input
              type="number"
              className="w-1/2 px-3 py-2"
              placeholder="Variant Quantity"
              value={variant.quantity}
              onChange={(e) => handleVariantChange(index, "quantity", e.target.value)}
            />
            <button type="button" onClick={() => removeVariant(index)} className="text-red-600">Remove</button>
          </div>
        ))}
        <button type="button" onClick={addVariant} className="bg-gray-300 px-4 py-2">Add Variant</button>
      </div> */}

      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white"> 
        ADD
      </button>

    </form>
  );
};

export default Add;
