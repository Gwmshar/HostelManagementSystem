import React from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
export default function Navbar({ profile }) {
  const [cookies, removeCookies] = useCookies([]);
  const navigate = useNavigate();
  const logOut = () => {
    removeCookies("token", { path: "/" });
    navigate("/login");
  };
  return (
    <>
      <div className="w-[20%] flex flex-col justify-center items-center h-screen bg-[#22d3ee]">
        <div className="w-full flex flex-col justify-between items-center h-[80%]">
          <div className="bg-white rounded-full h-28 w-28 flex justify-center items-center">
            <h2 className="text-sm">{profile.name}</h2>
          </div>
          <ul className="flex flex-col gap-2">
            <li>
              <Link to="/">Home</Link>
            </li>
            {profile.role == "admin" && (
              <li>
                <Link to="/admin">Admin Panel</Link>
              </li>
            )}
            {profile.role != "admin" && (
              <li>
                <Link to="/roomdetail">Room Detail</Link>
              </li>
            )}
            <li onClick={logOut}>Logout</li>
          </ul>
          <div>Contact us</div>
        </div>
      </div>
    </>
  );
}
