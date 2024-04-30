import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminPanel from "./pages/AdminPanel";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Assign from "./pages/Assign";
import RoomDetail from "./pages/RoomDetail";

function App() {
  const [profile, setProfile] = useState({});
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            index
            element={<Home profile={profile} setProfile={setProfile} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/roomdetail" element={<RoomDetail />} />
          <Route path="/assign" element={<Assign profile={profile} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
