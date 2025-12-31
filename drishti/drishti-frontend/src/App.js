import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Track from "./pages/track";
import Register from "./pages/register";
import Navbar from "./Components/Navbar";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/new" element={<Register />} />
          <Route path="/track" element={<Track />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
