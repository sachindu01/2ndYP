import React from "react";
import { assets } from "../assets/admin_assets/assets";

const Add = () => {

  const subCategoryOptions = {
    Consumables: ["Resistors", "IC Bases", "LEDs","Wires"],
    Equipment: ["Drills", "Grinders"],
    Components: ["Arduino", "Raspberry"],
    Stations: ["Measuring", "Soldering","Assembly"],
  };
  
  return (
    <form className="flex flex-col w-full item-start gap-3">
      <div>
        <p className="mb-2">Upload Image</p>

        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20 cursor-pointer"
              src={assets.upload_area}
              alt=""
            />
            <input type="file" id="image1" hidden />
          </label>
          <label htmlFor="image2">
            <img
              className="w-20 cursor-pointer"
              src={assets.upload_area}
              alt=""
            />
            <input type="file" id="image2" hidden />
          </label>
          <label htmlFor="image3">
            <img
              className="w-20 cursor-pointer"
              src={assets.upload_area}
              alt=""
            />
            <input type="file" id="image3" hidden />
          </label>
          <label htmlFor="image4">
            <img
              className="w-20 cursor-pointer"
              src={assets.upload_area}
              alt=""
            />
            <input type="file" id="image4" hidden />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Write content here"
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select className="w-full px-3 py-2">
            <option value="Consumables">Consumables</option>
            <option value="Components">Components</option>
            <option value="Equipment">Equipment</option>
            <option value="Stations">Stations</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product Sub Category</p>
          <select className="w-full px-3 py-2">
            <option value="Consumables">Consumables</option>
            <option value="Components">Components</option>
            <option value="Equipment">Equipment</option>
            <option value="Stations">Stations</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Quantity</p>
          <input
            className="w-full px-3 py-2 sm:w-[120px]"
            type="Number"
            placeholder="1"
          />
        </div>
      </div>

      <div>
        <p className="mb-2">Product Color</p>
        <div className="flex gap-3">
          <div>
            <p className="bg-slate-200 px-3 py-1 cursor-pointer">Red</p>
          </div>
          <div>
            <p className="bg-slate-200 px-3 py-1 cursor-pointer">Black</p>
          </div>
          <div>
            <p className="bg-slate-200 px-3 py-1 cursor-pointer">Blue</p>
          </div>
          <div>
            <p className="bg-slate-200 px-3 py-1 cursor-pointer">Green</p>
          </div>
          <div>
            <p className="bg-slate-200 px-3 py-1 cursor-pointer">Yellow</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input type="checkbox" id='availablity'/>
        <label className="cursor-pointer" htmlFor="availablity"> Available </label>
      </div>

      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white"> 
        ADD
      </button>

    </form>
  );
};

export default Add;
