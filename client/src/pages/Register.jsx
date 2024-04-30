import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roomNo, setRoomNo] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [hostelName, setHostelName] = useState("SJ");
  const [phoneNo, setPhoneNo] = useState("");
  const [semester, setSemester] = useState("");
  const [branch, setBranch] = useState("CSE");
  const navigate = useNavigate();
  const handleRegister = async () => {
    try {
      if (
        name == "" ||
        email == "" ||
        password == "" ||
        roomNo == "" ||
        rollNo == "" ||
        hostelName == "" ||
        phoneNo == "" ||
        semester == "" ||
        branch == ""
      ) {
        toast.error("Please fill up all the fields");
      } else {
        const data = await axios.post(
          "http://localhost:4000/signup",
          {
            name,
            email,
            password,
            roomNo,
            rollNo,
            hostelName,
            phoneNo,
            semester,
            branch,
          },
          { withCredentials: true }
        );
        if (data.data.Success) {
          toast.success(data.data.message);
          navigate("/login");
        } else {
          toast.error(data.data.message);
        }
        setName("");
        setEmail("");
        setPassword("");
        setRoomNo("");
        setRollNo("");
        setHostelName("");
        setPhoneNo("");
        setSemester("");
        setBranch("");
      }
    } catch (err) {
      toast.error("Opps! something went wrong");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister();
  };
  return (
    <div>
      <div>
        <div className="flex flex-col h-screen items-center justify-center gap-3">
          <h2 className="text-2xl">Register</h2>
          <form
            action=""
            className="flex flex-col gap-4 items-center justify-center"
            onSubmit={(e) => handleSubmit(e)}
          >
            <input
              type="text"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="number"
              placeholder="room no"
              value={roomNo}
              onChange={(e) => setRoomNo(e.target.value)}
            />
            <input
              type="number"
              placeholder="roll no"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
            />
            <input
              type="number"
              placeholder="Semester"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
            />
            <div className="flex justify-between px-3 items-center border border-black h-12 w-96 text-gray-400">
              <div>Branch: </div>
              <div>
                <select
                  className="w-24 h-12 text-center border border-black text-black"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                >
                  <option>CSE</option>
                  <option>IE</option>
                  <option>CE</option>
                  <option>FET</option>
                  <option>ECE</option>
                </select>
              </div>
            </div>
            <div className="flex justify-between px-3 items-center border border-black h-12 w-96 text-gray-400">
              <div>Hostel Name: </div>
              <div>
                <select
                  className="w-24 h-12 text-center border border-black text-black"
                  value={hostelName}
                  onChange={(e) => setHostelName(e.target.value)}
                >
                  <option>SJ</option>
                  <option>JD</option>
                  <option>SNM</option>
                  <option>BJ</option>
                </select>
              </div>
            </div>
            <input
              type="number"
              placeholder="phone number"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
            />
            <button className="border-black border">Register</button>
            <div>
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500">
                Sign In
              </Link>
            </div>
          </form>
          <div>
            <p>
              <span>Note: </span>
              After registration you need to wait for admin approval to login
              into dashboard
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
