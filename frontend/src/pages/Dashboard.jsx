import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopConext";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import axios from "axios";
import jsPDF from "jspdf";

const Dashboard = () => {
  const { backendUrl, token, navigate } = useContext(ShopContext);

  const [requests, setRequests] = useState([]);
  const [fundRequests, setFundRequests] = useState([]);

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
        setRequests(response.data.orders.reverse());
      }
    } catch (error) {}
  };

  const loadFundData = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.post(
        backendUrl + "/api/fund/userreq",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setFundRequests(response.data.userFundRequests.reverse());
      }
    } catch (error) {}
  };

  console.log(fundRequests);

  useEffect(() => {
    loadOrderData();
    loadFundData();
  }, [token]);

  const handleButtonClick = (type, status, reqId) => {
    if (status === "accepted") {
      generatePDF(type, reqId);
      // Handle download PDF (dummy logic here)
      alert(`Downloading PDF for request ${reqId}`);
    } else if (status === "declined" && type === "inventory") {
      // Navigate to the inventory page
      navigate("/inventory");
    } else if (status === "declined" && type === "fund") {
      // Navigate to the fund form
      navigate("/fund-form");
    }
  };

  // const generatePDF = (type, reqId) => {
  //   const doc = new jsPDF({
  //     unit: 'pt',  // Specify units in points
  //     format: 'a4' // Use a standard A4 page size
  //   });
  
  //   // Set font to a standard one, like 'helvetica'
  //   doc.setFont('helvetica', 'normal');
    

  //   if (type === "inventory") {
  //     // Find the specific request using reqId
  //     const request = requests.find((req) => req._id === reqId);

  //     if (request) {
  //       // Adding user info
  //       doc.text("Inventory Request", 20, 20);
  //       doc.text(
  //         `Requested by: ${request.userInfo.firstName} ${request.userInfo.lastName}`,
  //         20,
  //         40
  //       );
  //       doc.text(`Email: ${request.userInfo.email}`, 20, 60);
  //       doc.text(`Phone: ${request.userInfo.phone}`, 20, 80);

  //       // Adding project info
  //       doc.text(`Project: ${request.projectInfo.projectName}`, 20, 100);
  //       doc.text(
  //         `Description: ${request.projectInfo.projectDescription}`,
  //         20,
  //         70
  //       );
  //       doc.text(`Timeline: ${request.projectInfo.projectTimeline}`, 20, 120);

  //       // Adding item details
  //       doc.text("Items Requested:", 20, 140);
  //       request.items.forEach((item, index) => {
  //         doc.text(`${item.name} x ${item.quantity}`, 20, 160 + index * 20);
  //       });

  //       // Adding request metadata
  //       doc.text(`Verification Key: ${request.verificationKey}`, 20, 250);
  //       doc.text(
  //         `Request Date: ${new Date(request.date).toDateString()}`,
  //         20,
  //         140
  //       );

  //       if (request.issuedDate) {
  //         doc.text(
  //           `Issued Date: ${new Date(request.issuedDate).toDateString()}`,
  //           20,
  //           200
  //         );
  //       }
  //       if (request.returnedDate) {
  //         doc.text(
  //           `Returned Date: ${new Date(request.returnedDate).toDateString()}`,
  //           20,
  //           220
  //         );
  //       }

  //       doc.save(`inventory_request_${reqId}.pdf`);
  //     }
  //   } else if (type === "fund") {
  //     // Find the specific fund request using reqId
  //     const fundRequest = fundRequests.find((req) => req._id === reqId);

  //     if (fundRequest) {
  //       // Adding fund request info
  //       doc.text("Fund Request", 20, 20);
  //       doc.text(
  //         `Project Title: ${fundRequest.projectInfo.projectTitle}`,
  //         20,
  //         30
  //       );
  //       doc.text(`Project Leader: ${fundRequest.leader}`, 20, 40);
  //       doc.text(`Team Members: ${fundRequest.teamMembers.join(", ")}`, 20, 50);
  //       doc.text(`Supervisor: ${fundRequest.supervisor.name}`, 20, 60);
  //       doc.text(`Verification Key: ${fundRequest.verificationKey}`, 20, 100);

  //       // Adding request date
  //       doc.text(
  //         `Request Date: ${new Date(fundRequest.date).toDateString()}`,
  //         20,
  //         70
  //       );

  //       // Saving the PDF
  //       doc.save(`fund_request_${reqId}.pdf`);
  //     }
  //   }
  // };
  const generatePDF = (type, reqId) => {
    const doc = new jsPDF({
      unit: 'pt',  // Specify units in points
      format: 'a4' // Use a standard A4 page size
    });
  
    // Set font to a standard one, like 'helvetica'
    doc.setFont('helvetica', 'normal');
  
    if (type === "inventory") {
      // Find the specific request using reqId
      const request = requests.find((req) => req._id === reqId);
  
      if (request) {
        let y = 20; // Initialize y-coordinate for the first line
  
        // Adding user info
        doc.text("Inventory Request", 20, y);
        y += 30;
        doc.text(`Requested by: ${request.userInfo.firstName} ${request.userInfo.lastName}`, 20, y);
        y += 30;
        doc.text(`Email: ${request.userInfo.email}`, 20, y);
        y += 30;
        doc.text(`Phone: ${request.userInfo.phone}`, 20, y);
        y += 30;
  
        // Adding project info
        doc.text(`Project: ${request.projectInfo.projectName}`, 20, y);
        y += 30;
        doc.text(`Description: ${request.projectInfo.projectDescription}`, 20, y);
        y += 30;
        doc.text(`Timeline: ${request.projectInfo.projectTimeline}`, 20, y);
        y += 30;
  
        // Adding item details
        doc.text("Items Requested:", 20, y);
        y += 30;
        request.items.forEach((item, index) => {
          doc.text(`${item.name} x ${item.quantity}`, 20, y + index * 20);
        });
        y += request.items.length * 20;
  
        // Adding request metadata
        
        doc.text(`Request Date: ${new Date(request.date).toDateString()}`, 20, y);
        y += 30;
  
        if (request.issuedDate) {
          doc.text(`Issued Date: ${new Date(request.issuedDate).toDateString()}`, 20, y);
          y += 30;
        }
        if (request.returnedDate) {
          doc.text(`Returned Date: ${new Date(request.returnedDate).toDateString()}`, 20, y);
          y += 30;
        }

        doc.text(`Verification Key: ${request.verificationKey}`, 20, y);
        y += 60;
  
        doc.save(`inventory_request_${reqId}.pdf`);
      }
    } else if (type === "fund") {
      // Find the specific fund request using reqId
      const fundRequest = fundRequests.find((req) => req._id === reqId);
  
      if (fundRequest) {
        let y = 20; // Initialize y-coordinate for the first line
  
        // Adding fund request info
        doc.text("Fund Request", 20, y);
        y += 20;
        doc.text(`Project Title: ${fundRequest.projectInfo.projectTitle}`, 20, y);
        y += 20;
        doc.text(`Project Leader: ${fundRequest.leader}`, 20, y);
        y += 20;
        doc.text(`Team Members: ${fundRequest.teamMembers.join(", ")}`, 20, y);
        y += 20;
        doc.text(`Supervisor: ${fundRequest.supervisor.name}`, 20, y);
        y += 20;
        doc.text(`Verification Key: ${fundRequest.verificationKey}`, 20, y);
        y += 20;
  
        // Adding request date
        doc.text(`Request Date: ${new Date(fundRequest.date).toDateString()}`, 20, y);
        
        // Saving the PDF
        doc.save(`fund_request_${reqId}.pdf`);
      }
    }
  };
  

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY INVENTORY"} text2={"REQUESTS"} />
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
                  onClick={() =>
                    handleButtonClick("inventory", "accepted", req._id)
                  }
                >
                  Download PDF
                </button>
              )}
              {req.status === "declined" && (
                <button
                  className="border py-2 px-4 bg-red-500 text-white font-medium rounded-sm"
                  onClick={() =>
                    handleButtonClick("inventory", "declined", req._id)
                  }
                >
                  Request Again
                </button>
              )}
              {req.status === "pending" && (
                <button
                  onClick={loadOrderData}
                  className="border py-2 px-4 text-sm font-medium rounded-sm"
                >
                  Track Request
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="text-2xl">
        <Title text1={"MY FUND"} text2={"REQUESTS"} />
      </div>
      <div>
        {fundRequests.map((req, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-b border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
            // className="py-4 border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <img className="w-16 sm:w-20" src={assets.fund_icon} />
            <div>
              <p>
                Project Title: <strong>{req.projectInfo.projectTitle} </strong>
              </p>
              <p>
                Leader: <strong>{req.leader} </strong>
              </p>
              <p>Team Members:{req.teamMembers.join(", ")}</p>
            </div>

            <div>
              <p>Supervisor: {req.supervisor.name} </p>
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
                  onClick={() => handleButtonClick("fund", "accepted", req._id)}
                >
                  Download PDF
                </button>
              )}
              {req.status === "declined" && (
                <button
                  className="border py-2 px-4 bg-red-500 text-white font-medium rounded-sm"
                  onClick={() => handleButtonClick("fund", "declined", req._id)}
                >
                  Request Again
                </button>
              )}
              {req.status === "pending" && (
                <button
                  onClick={loadFundData}
                  className="border py-2 px-4 text-sm font-medium rounded-sm"
                >
                  Track Request
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
