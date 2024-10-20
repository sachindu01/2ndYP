import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Fund = ({ token }) => {
  const [fundRequests, setFundRequests] = useState([]);
  const [expandedRequest, setExpandedRequest] = useState(null); 

  const fetchAllFundRequests = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/fund/list",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setFundRequests(response.data.fundRequests.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  console.log(fundRequests);

    const statusHandler = async (event, reqId) => {
      const newStatus = event.target.value;

      try {
        const response = await axios.post(
          backendUrl + "/api/fund/status",
          { reqId, status: newStatus },
          { headers: { token } }
        );
        if (response.data.success) {
          await fetchAllFundRequests();
          toast.success("Status updated successfully!");
        }
      } catch (error) {
        toast.error(error.message);
        console.log(error.message);
      }
    };

  useEffect(() => {
    fetchAllFundRequests();
  }, [token]);

  const toggleDetails = (requestId) => {
    if (expandedRequest === requestId) {
      setExpandedRequest(null); // Collapse if already expanded
    } else {
      setExpandedRequest(requestId); // Expand the current request
    }
  };

  return (
    <div>
      <h3>Fund Requests Page</h3>
      <div>
        {fundRequests.map((req, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
          >
            <div>
              <p className="font-medium">Leader: {req.leader}</p>
              <p>Team Members: {req.teamMembers.join(", ")}</p>
            </div>

            <div>
              <p className="font-medium">Project Title: {req.projectInfo.projectTitle}</p>
              <p>Type: {req.projectInfo.projectType}</p>
            </div>

            <div>
              <p className="font-medium">Budget Details</p>
              <a  className="text-blue-600" href={req.budgetDetails} target="_blank" rel="noreferrer">View Budget</a>
            </div>

            <select
              value={req.status}
              className="p-2 font-semibold"
              onChange={(e) => statusHandler(e, req._id)}
            >
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="declined">Declined</option>
            </select>

            <button
              className="text-blue-500 underline"
              onClick={() => toggleDetails(req._id)}
            >
              {expandedRequest === req._id ? "Hide Details" : "Show Details"}
            </button>

            {expandedRequest === req._id && (
              <div className="col-span-full bg-gray-50 p-4 mt-2 border-t-2">

                <p className="mt-4"><strong> Project Info:</strong> 
                    <p className="ml-4"><span className="font-semibold">Description:</span> {req.projectInfo.projectDescription}</p>
                    <p className="ml-4"><span className="font-semibold">Starting Date:</span> {new Date(req.projectInfo.startingDate).toLocaleDateString()}</p>
                    <p className="ml-4"><span className="font-semibold">Completion Date:</span>{new Date(req.projectInfo.completionDate).toLocaleDateString()}</p>
                    <p className="ml-4"><span className="font-semibold">Goal:</span> {req.projectInfo.goal}</p>
                    <p className="ml-4"><span className="font-semibold">Risks:</span> {req.projectInfo.risks}</p>
                </p>                
                
                <p className="mt-4"><strong> Contact Info:</strong> 
                    <p className="ml-4"><span className="font-semibold">Email:</span> {req.contactInfo.email}</p>
                    <p className="ml-4"><span className="font-semibold">Phone:</span> {req.contactInfo.phone}</p>
                </p>

                <p className="mt-4"><strong>Supervisor:</strong>
                    <p className="ml-4"><span className="font-semibold">Name:</span> {req.supervisor.name}</p>
                    <p className="ml-4"><span className="font-semibold">Email:</span> {req.supervisor.email}</p>
                </p>

              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

};

export default Fund;
