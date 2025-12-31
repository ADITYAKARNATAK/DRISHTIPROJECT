import { useAuth } from "../context/AuthContext";
import Navbar from "../Components/Navbar";

function Admin() {
  const { grievances } = useAuth();

  return (
    <>
      <Navbar />
      <div className="center-screen">
        <div className="card wide">
          <h2>Admin Dashboard</h2>

          {grievances.length === 0 && <p>No grievances yet</p>}

          {grievances.map((g) => (
            <div key={g.id} className="admin-item">
              <p><b>{g.id}</b></p>
              <p>{g.text}</p>
              <span>Status: {g.status}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Admin;
