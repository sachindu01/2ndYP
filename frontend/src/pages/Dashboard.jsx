import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopConext";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import axios from "axios";

const Dashboard = () => {
  const { backendUrl, token, navigate } = useContext(ShopContext);

  const [requests, setRequests] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setRequests(response.data.orders);
      }
    } catch (error) {}
  };

  console.log(requests);

  useEffect(() => {
    loadOrderData();
  }, [token]);

  const handleButtonClick = (status, reqId) => {
    if (status === "accepted") {
      // Handle download PDF (dummy logic here)
      alert(`Downloading PDF for request ${reqId}`);
    } else if (status === "declined") {
      // Navigate to the inventory page
      navigate("/inventory");
    }
  };

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
                  return (
                    // <p className="py-1" key={index}>
                    //   {item.name} X {item.quantity}{" "}
                    // </p>
                    <div className="flex items-center py-0.5" key={index}>
                      <p className="text-gray-700 mr-4">{item.name}</p>
                      <span className=" font-bold px-3 ">
                        x {item.quantity}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <p>Items: {req.items.length}</p>
              <p>Date: {new Date(req.date).toDateString()}</p>
            </div>

            {/* Status Display */}
            <div>
              <div className="flex items-center gap-2">
                {/* Conditionally render based on status */}
                {req.status === "accepted" && (
                  <>
                    <div className="min-w-2 h-2 rounded-full bg-green-500"></div>
                    <p className="text-sm md:text-base">Request Accepted</p>
                  </>
                )}
                {req.status === "declined" && (
                  <>
                    <div className="min-w-2 h-2 rounded-full bg-red-500"></div>
                    <p className="text-sm md:text-base">Request Declined</p>
                  </>
                )}
                {req.status === "pending" && (
                  <>
                    <div className="min-w-2 h-2 rounded-full bg-yellow-500"></div>
                    <p className="text-sm md:text-base">Pending</p>
                  </>
                )}
              </div>
            </div>

            {/* Conditionally Render Button */}
            <div>
              {req.status === "accepted" && (
                <button
                  className="border py-2 px-4 bg-blue-500 text-white font-medium rounded-sm"
                  onClick={() => handleButtonClick("accepted", req._id)}
                >
                  Download PDF
                </button>
              )}
              {req.status === "declined" && (
                <button
                  className="border py-2 px-4 bg-red-500 text-white font-medium rounded-sm"
                  onClick={() => handleButtonClick("declined", req._id)}
                >
                  Request Again
                </button>
              )}
              {req.status === "pending" && (
                <button
                  onClick={loadOrderData}
                  className="border py-2 px-4 text-sm font-medium rounded-sm"
                >
                  Track Order
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
