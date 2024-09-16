import React from "react";
import { useState } from "react";
import { requests, assets } from "../assets/admin_assets/assets";

const Request = () => {
  const [request, setRequest] = useState([]);

  return (
    <div>
      <h3>Requests Page</h3>
      <div>
        {requests.map((req, index) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
            key={index}
          >
            <img className="w-12"
            src={assets.parcel_icon} alt="" />
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
              <p className="mb-2 font-medium">{req.address.firstName + " " + req.address.lastName}</p>
              <p>{req.address.phone}</p>
            </div>
            <div>
              <p>Items: {req.items.length}</p>
              <p>Date: {new Date(req.date).toLocaleDateString()}</p>
            </div>
            <select className="p-2 font-semibold" defaultValue={req.status}>
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Declined">Declined</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Request;
