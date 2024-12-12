import React, { useEffect, useState } from "react";
import Dashboard from "../Dashboard/Dashboard";
import image from "../image/Rice-Farm.jpg";
import { IoIosSearch } from "react-icons/io";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function Mainboard() {
  const [farmers, setFarmers] = useState({});
  const [requests, setRequests] = useState(null);

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://agriculture-server-beta.onrender.com/api/v1/admin/analytics",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFarmers(response.data.data);
      } catch (error) {
        console.error("Error fetching farmers data:", error);
      }
    };

    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://agriculture-server-beta.onrender.com/api/v1/admin/requests",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setRequests(response.data.data);
      } catch (error) {
        console.error("Error fetching requests data:", error);
      }
    };

    fetchFarmers();
    fetchRequests();
  }, []);

  return (
    <div className="mainboard-container">
      <div className="dash-board">
        <Dashboard />
      </div>

      <div className="main-content">
        <div className="top-bar">
          <div className="search-bar">
            <IoIosSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search for any content"
              className="search-input"
            />
          </div>
          <div className="user-avatar">
            <img src={image} alt="User Avatar" />
          </div>
        </div>

        <div className="summary-section">
          <h5>Summary</h5>
          <div className="summary-cards">
            <div className="summary-card">
              <h4>Farmers</h4>
              <p>{farmers.totalUsers || "Loading..."}</p>
              <div className="progress-circle">12%</div>
            </div>
            <div className="summary-card">
              <h4>Farm Lands</h4>
              <p>{farmers.totalLands || "Loading..."}</p>
              <div className="progress-circle">40%</div>
            </div>
            <div className="summary-card">
              <h4>Soil Testers</h4>
              <p>10</p>
              <div className="progress-circle">60%</div>
            </div>
            <div className="summary-card">
              <h4>Soil Requests</h4>
              <p>{farmers.totalRequests || "Loading..."}</p>
              <div className="progress-circle">75%</div>
            </div>
          </div>
        </div>

        <div className="table-section">
          <h5>Manage Your Farm</h5>
          <table className="styled-table">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Farm Name</th>
                <th>Address</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests ? (
                requests.map((land, index) => (
                  <tr key={land._id}>
                    <td>{index + 1}</td>
                    <td>{land.land.name}</td>
                    <td>{land.land.location.address}</td>
                    <td>{land.status || "N/A"}</td>
                    <td>
                      <button className="action-btn">
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">Loading...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Mainboard;
