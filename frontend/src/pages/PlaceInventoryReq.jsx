import React, { useContext, useState } from "react";
import Title from "../components/Title";

import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../context/ShopConext";

import { toast } from "react-toastify";

const PlaceInventoryReq = () => {
  const { navigate, backendUrl, token, cartItems, products, setCartItems } =
    useContext(ShopContext);

  /*const [formData,setFormData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''
  })*/

  /*const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData(data=>({...data,[name]:value}))


  }*/

  const OnSubmitHandler = async (event) => {
    event.preventDefault();
    // try {
    //   let orderItems = [];
    //   for (const items in cartItems) {
    //     for (const item in cartItems[items]) {
    //       if (cartItems[items][item] > 0) {
    //         const itemInfo = structuredClone(
    //           products.find((product) => product._id === items)
    //         );
    //         if (itemInfo) {
    //           itemInfo.quantity = cartItems[items][item];
    //           orderItems.push(itemInfo);
    //         }
    //       }
    //     }
    //   }
    //   let orderData = {
    //     items: orderItems,
    //   };

    //   switch (method) {
    //     case "cod":
    //       const response = await axios.post(
    //         backendUrl + "/api/order/place",
    //         orderData,
    //         { headers: { token } }
    //       );
    //       console.log(response.data);
    //       if (response.data.success) {
    //         setCartItems({});
    //         navigate("/orders");
    //       } else {
    //         toast.error(response.data.message);
    //       }
    //       break;
    //     default:
    //       break;
    //   }
    // } catch (error) {}
  };

  return (
    <form
      onSubmit={OnSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* Left side - Contact Information */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[600px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"CONTACT"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First name"
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email address"
        />

        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="number"
          placeholder="Phone"
        />
      </div>

      {/* Right side - Project Information */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[600px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"PROJECT"} text2={"INFORMATION"} />
        </div>
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Project name"
        />
        <textarea
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full h-32"
          placeholder="Project description"
        />

        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Timeline (e.g., 3 months)"
        />
      </div>
    </form>
  );
};

export default PlaceInventoryReq;
