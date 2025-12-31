import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <>
      <div className="tricolor-bar"></div>
      <div style={{
        background: "#0b1d39",
        color: "white",
        padding: "14px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h2 style={{ margin: 0, cursor: "pointer" }} onClick={() => navigate("/dashboard")}>
          🏛️ Drishti
        </h2>

        <div style={{ display: "flex", gap: "12px" }}>
          <button onClick={() => navigate("/dashboard")}>Dashboard</button>
          <button onClick={() => navigate("/track")}>Track</button>
          <button onClick={() => { logout(); navigate("/"); }}>Logout</button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
