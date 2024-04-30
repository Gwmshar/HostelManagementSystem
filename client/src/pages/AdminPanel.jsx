import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast } from "react-hot-toast";
import Navbar from "./Navbar";
export default function AdminPanel() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [cookies, removeCookies] = useCookies([]);
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const getStudentList = async () => {
    try {
      await axios.get("http://localhost:4000/getstudents").then((res) => {
        setStudents(res.data);
      });
    } catch (err) {
      console.log("error");
    }
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:4000/search", { search })
        .then((res) => {
          setStudents(res.data);
        });
    } catch (err) {
      console.log("Error");
    }
    setSearch("");
  };

  const handleDelete = async (a) => {
    try {
      await axios.delete(`http://localhost:4000/peopledelete/${a}`);
      toast.success("User is deleted");
      window.location.reload();
    } catch (err) {
      console.log("Error");
    }
  };

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
      if (user.role != "admin") {
        navigate("/");
      }
      setProfile(user);
    };
    verifyCookies();
  }, []);

  useEffect(() => {
    getStudentList();
  }, []);
  return (
    <>
      <div className="flex">
        <Navbar profile={profile} />
        <div className="w-[80%] flex flex-col bg-gray-200 max-h-screen overflow-y-scroll">
          <div className="w-full flex justify-between items-center h-[15%] mt-5">
            <div className="ml-10 text-2xl font-semibold">
              <h2>Admin Page</h2>
            </div>
            <div className="flex gap-5 mr-10 justify-center items-center">
              <div className="bg-white rounded-full h-24 w-24 flex justify-center items-center">
                <h2>Profile</h2>
              </div>
              <div>{profile.name}</div>
            </div>
          </div>
          <div className="flex justify-between items-center h-[25%] mt-5">
            <form
              className="ml-10 flex gap-5"
              onSubmit={(e) => handleSearch(e)}
            >
              <input
                type="text"
                placeholder="name or room no"
                className="w-96 h-12 px-5"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button>Search</button>
            </form>
            <div className="mr-10">
              <button className="">
                <Link to="/assign">Assign</Link>
              </button>
            </div>
          </div>
          <div className="text-center my-5 text-2xl">List of Students</div>
          <div className="flex w-full justify-center items-center mb-10">
            <div className="flex w-[80%] bg-white rounded-md">
              {students.length > 0 ? (
                <table className="w-full table-fixed my-5">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Hostel Name</th>
                      <th>Room No</th>
                      <th>Roll No</th>
                      <th>Semester</th>
                      <th>Branch</th>
                      <th>Control</th>
                    </tr>
                  </thead>
                  {students.length > 0 && (
                    <tbody>
                      {students.map((a) => {
                        return (
                          <tr className="text-center my-2" key={a._id}>
                            <td className="text-wrap">{a.name}</td>
                            <td>{a.hostelName}</td>
                            <td>{a.roomNo}</td>
                            <td>{a.rollNo}</td>
                            <td>{a.semester}</td>
                            <td>{a.branch}</td>
                            <td className="flex gap-3 justify-center items-center">
                              <button
                                className="btn"
                                onClick={() => handleDelete(a._id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  )}
                </table>
              ) : (
                <div className="bg-gray-200 w-full text-center text-2xl">
                  No data found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
