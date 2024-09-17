import React, { useContext } from "react";
import { ShopContext } from "../context/ShopConext";
import Title from "../components/Title";
import { requests, assets } from "../assets/frontend_assets/assets";

const Dashboard = () => {
  const { products } = useContext(ShopContext);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"REQUESTS"} />
      </div>

      <div>
        {requests.map((req, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-b border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
            // className="py-4 border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <img className="w-16 sm:w-20" src={assets.parcel_icon} />
            <div>
              <div>
                {req.items.map((item, index) => {
                  if (index === req.items.length - 1) {
                    return (
                      <p className="py-0.5" key={index}>
                        {item.name} X {item.quantity}{" "}
                        <span>
                          {item.size} {item.color}
                        </span>
                      </p>
                    );
                  } else {
                    return (
                      <p className="py-0.5" key={index}>
                        {item.name} X {item.quantity}{" "}
                        <span>
                          {item.size} {item.color}
                        </span>
                        ,
                      </p>
                    );
                  }
                })}
              </div>
            </div>

            <div>
              <p>Items: {req.items.length}</p>
              <p>Date: {new Date(req.date).toLocaleDateString()}</p>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                <p className="text-sm md:text-base">Request Accepted</p>
              </div>
            </div>

            <button className="border py-2 text-sm font-medium rounded-sm">
              Track Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
