import React, { useState } from "react";
import image from "../image/leaf2.png";
import { AiOutlineLogout } from "react-icons/ai";
import {AiOutlineUser, AiOutlineSearch } from "react-icons/ai";
import { RxDashboard } from "react-icons/rx";
import { GrTest } from "react-icons/gr";
import { LuTestTube } from "react-icons/lu"; 
import { MdOutlineDashboard } from "react-icons/md";
import { Link } from "react-router-dom";

function Dashboard() {
  const [selected, setSelected] = useState(null);

  const handleClick = (index) => {
    setSelected(index);
  };

  return (
    <div>
      <div className="main-board">
        <Link to={"/mainboard"} className="b-line">
          <div className="agricultur">
            <h3>
              FarmTrack
            </h3>
          </div>
        </Link>
        <div className="input-holders">
          <input
            type="text"
            placeholder="Search for any content"
            className="search-input"
          />
        </div>

        <div
          className="board-details"
          style={{
            fontFamily: "sans-serif",
          }}
        >
          {[
            { name: "Dashboard", path: "/mainboard", icon: <RxDashboard /> },
            { name: "Farmers", path: "/farmers", icon: <AiOutlineUser /> },
            { name: "Test Request", path: "/farms", icon: <GrTest /> },
          ].map((item, index) => (
            <Link to={item.path} key={index} className="b-line">
              <div
                className={`board--details ${
                  selected === index ? "selected" : ""
                }`}
                onClick={() => handleClick(index)}
                style={{
                  cursor: "pointer",
                  display: "flex", // Use flex to align the icon and text
                  alignItems: "center",
                }}
              >
                <span style={{ marginRight: "10px", color:"white",marginTop:"-24px" }}>{item.icon}</span> {/* Display the icon */}
                <h4 style={{ fontSize: "20px", fontFamily: "sans-serif" }}>
                  {item.name}
                </h4>
              </div>
            </Link>
          ))}
        </div>

        {/* <div className="log-out">
          <div className="logout">
            <AiOutlineLogout />
          </div>
          <div className="log--out">
            <h4>Logout</h4>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Dashboard;
