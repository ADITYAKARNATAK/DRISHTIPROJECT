import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/theme.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("http://127.0.0.1:8000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });

    const data = await res.json();
    if (data.success) {
     localStorage.setItem("drishti_user", username);
  navigate("/dashboard");
    }
  };

  return (
    <>
      <div className="tricolor-bar"></div>
      <div className="page" style={{ maxWidth: "420px", marginTop: "120px" }}>
        <h2>Drishti Portal</h2>
        <p>Citizen Grievance Redressal System</p>

        <form onSubmit={handleLogin}>
          <input
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <button type="submit">Secure Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
