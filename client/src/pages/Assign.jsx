import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import Navbar from "./Navbar";
import AssignBox from "../components/AssignBox";
export default function Assign() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const [profile, setProfile] = useState({});
  const [cookies, removeCookies] = useCookies([]);
  const getData = async () => {
    try {
      await axios
        .get("http://localhost:4000/find")
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
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
    getData();
  }, []);
  return (
    <>
      <div className="flex">
        <Navbar profile={profile} />
        <div className="w-[80%] flex flex-col bg-gray-200 gap-3 max-h-screen overflow-y-scroll">
          <div className="my-5 text-center text-2xl">Assign Students</div>
          <div className="flex w-full h-full items-center flex-col gap-3">
            {data.length > 0 ? (
              data.map((a) => {
                return (
                  <div
                    className=" w-3/4 min-h-64 flex justify-center items-center bg-white flex-col gap-2"
                    key={a._id}
                  >
                    <AssignBox a={a} />
                  </div>
                );
              })
            ) : (
              <div>No data found</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
