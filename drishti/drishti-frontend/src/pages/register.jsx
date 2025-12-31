import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/theme.css";

const Register = () => {
  const navigate = useNavigate();

  // 🔒 SINGLE SOURCE OF TRUTH FOR USERNAME
  const user = localStorage.getItem("drishti_user");

  const [category, setCategory] = useState("Water");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const submitComplaint = async () => {
    if (!user) {
      alert("User not logged in. Please login again.");
      return;
    }

    if (!description.trim() || !address.trim()) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/complaints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user,          // ✅ EXACT SAME USERNAME
          category: category,
          description: description,
          address: address,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert(
          `Complaint Registered Successfully!\n\nComplaint ID: ${data.complaint_id}`
        );

        // Navigate only AFTER backend confirms save
        navigate("/track");
      } else {
        alert("Failed to register complaint");
      }
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h2>Register Grievance</h2>
      <p>
        Logged in as: <b>{user}</b>
      </p>

      <label>Category</label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="Water">Water</option>
        <option value="Electricity">Electricity</option>
        <option value="Road">Road</option>
        <option value="Sanitation">Sanitation</option>
        <option value="Other">Other</option>
      </select>

      <label>Problem Description</label>
      <textarea
        placeholder="Describe your issue in detail"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label>Address / Location</label>
      <input
        placeholder="Enter area / ward / village"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <button onClick={submitComplaint} disabled={loading}>
        {loading ? "Submitting..." : "Submit Grievance"}
      </button>
    </div>
  );
};

export default Register;
