import React, { useEffect, useState } from "react";
import "../styles/theme.css";

const Track = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔒 SINGLE SOURCE OF TRUTH
  const user = localStorage.getItem("drishti_user");

  useEffect(() => {
    const fetchComplaints = async () => {
      if (!user) {
        setError("User not logged in. Please login again.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://127.0.0.1:8000/complaints/${user}`
        );

        const data = await response.json();

        console.log("TRACK API RESPONSE:", data); // 🔥 IMPORTANT DEBUG

        if (data && Array.isArray(data.complaints)) {
          setComplaints(data.complaints);
        } else {
          setComplaints([]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Unable to fetch complaints from server.");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [user]);

  if (loading) {
    return (
      <div className="page">
        <p>Loading complaints...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h2>Your Complaints</h2>
      <p>
        Logged in as: <b>{user}</b>
      </p>

      {complaints.length === 0 ? (
        <p>No complaints registered.</p>
      ) : (
        complaints.map((c) => (
          <div key={c.id} className="card">
            <p>
              <b>Complaint ID:</b> {c.id}
            </p>
            <p>
              <b>Category:</b> {c.category}
            </p>
            <p>
              <b>Description:</b> {c.description}
            </p>
            <p>
              <b>Address:</b> {c.address}
            </p>
            <p>
              <b>Status:</b> {c.status}
            </p>

            {c.priority && (
              <span className={`badge ${c.priority.toLowerCase()}`}>
                {c.priority} Priority
              </span>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Track;
