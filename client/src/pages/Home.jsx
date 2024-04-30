import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Navbar from "./Navbar";

export default function Home({ profile, setProfile }) {
  const navigate = useNavigate();
  const [cookies, removeCookies] = useCookies([]);
  useEffect(() => {
    const verifyCookies = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:4000",
        {},
        { withCredentials: true }
      );
      const { Success, user } = data;
      setTimeout(() => {
        if (!Success) {
          navigate("/login");
        }
      }, 2000);
      setProfile(user);
    };
    verifyCookies();
  }, []);
  return (
    <>
      <div className="flex">
        <Navbar profile={profile} />
        <div className="w-[80%] flex flex-col justify-around items-center bg-gray-200">
          <div className="bg-[#22d3ee] rounded-full w-72 h-72 flex justify-center items-center text-white text-3xl">
            <h2>Profile</h2>
          </div>
          <div className="w-full flex justify-center">
            <div className="grid grid-cols-2 w-2/4 gap-10">
              <h2>Name: {profile.name}</h2>
              <h2>Email: {profile.email}</h2>
              <h2>Phone No: {profile.phoneNo}</h2>
              {profile.role != "admin" && (
                <>
                  <h2>Roll No: {profile.rollNo}</h2>
                  <h2>Room Number: {profile.roomNo}</h2>
                  <h2>Hostel Name: {profile.hostelName}</h2>
                  <h2>Semester: {profile.semester}</h2>
                  <h2>Branch: {profile.branch}</h2>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Test() {
  return <div>Test</div>;
}

function Hi() {
  return <div>Hi</div>;
}
