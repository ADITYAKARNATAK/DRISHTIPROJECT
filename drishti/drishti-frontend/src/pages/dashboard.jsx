import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/theme.css";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="page">
      <h2>Welcome, {user}</h2>

      {/* Ashoka Chakra */}
      <svg className="chakra" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" stroke="#0b1d39" strokeWidth="4" fill="none" />
        {[...Array(24)].map((_, i) => (
          <line
            key={i}
            x1="50"
            y1="50"
            x2="50"
            y2="5"
            stroke="#0b1d39"
            strokeWidth="2"
            transform={`rotate(${i * 15} 50 50)`}
          />
        ))}
      </svg>

      <div className="dashboard-grid">
        <div className="dashboard-card" onClick={() => navigate("/dashboard/new")}>
          <h3>📝 Register Grievance</h3>
          <p>Submit a new grievance to the system.</p>
        </div>

        <div className="dashboard-card" onClick={() => navigate("/track")}>
          <h3>📂 Track Complaints</h3>
          <p>View all grievances submitted by you.</p>
        </div>

        <div className="dashboard-card" onClick={() => navigate("/track")}>
          <h3>📊 Complaint Status</h3>
          <p>Check status & complaint ID of previous submissions.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
