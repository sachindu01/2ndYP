import React from "react";
import { useState, useEffect } from "react";
import { assets } from "../assets/admin_assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Request = ({ token }) => {
  const [requests, setRequests] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setRequests(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value; // Get the new status from the event

    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: newStatus },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
        toast.success("Status updated successfully!");
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  console.log(requests);

  return (
    <div>
      <h3>Requests Page</h3>
      <div>
        {requests.map((req, index) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
            key={index}
          >
            <img className="w-12" src={assets.parcel_icon} alt="" />
            <div>
              <div>
                {req.items.map((item, index) => {
                  return (
                    <p className="py-0.5" key={index}>
                      {item.name} X {item.quantity}{" "}
                    </p>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="mb-2 font-medium">
                {req.userInfo.firstName + " " + req.userInfo.lastName}
              </p>
              <p>{req.userInfo.phone}</p>
            </div>

            <div>
              <p>Items: {req.items.length}</p>
              <p>Date: {new Date(req.date).toLocaleDateString()}</p>
            </div>

            <select
              value={req.status}
              className="p-2 font-semibold"
              onChange={(e)=> statusHandler(e,req._id) }
            >
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="declined">Declined</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Request;
