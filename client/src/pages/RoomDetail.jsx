import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function RoomDetail() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [cookies, removeCookies] = useCookies([]);
  const [student, setStudent] = useState([]);
  const getStudent = async () => {
    const roomNo = profile.roomNo;
    const hostelName = profile.hostelName;
    await axios
      .post("http://localhost:4000/roomcheck", {
        roomNo,
        hostelName,
      })
      .then((res) => {
        setStudent(res.data);
      });
  };
  useEffect(() => {
    getStudent();
  }, [profile]);

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
      if (!Success) {
        navigate("/login");
      }
      setProfile(user);
    };
    verifyCookies();
  }, []);
  return (
    <div className="flex">
      <Navbar profile={profile} />
      <div className="w-[80%] flex flex-col items-center bg-gray-200">
        <div className="mt-5 text-2xl">Room Details</div>
        <div className="flex w-full justify-center items-center mt-10">
          <div className="flex w-[80%] bg-white rounded-md">
            <table className="w-full table-fixed my-5">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Hostel Name</th>
                  <th>Room No</th>
                  <th>Roll No</th>
                  <th>Semester</th>
                  <th>Branch</th>
                </tr>
              </thead>
              {student.length > 0 && (
                <tbody>
                  {student.map((a) => {
                    return (
                      <tr className="text-center my-5" key={a._id}>
                        <td className="text-wrap">{a.name}</td>
                        <td>{a.hostelName}</td>
                        <td>{a.roomNo}</td>
                        <td>{a.rollNo}</td>
                        <td>{a.semester}</td>
                        <td>{a.branch}</td>
                      </tr>
                    );
                  })}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
