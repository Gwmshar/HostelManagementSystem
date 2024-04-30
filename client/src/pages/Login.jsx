import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      if (email == "" || password == "") {
        toast.error("Please fill up the fields");
      } else {
        const data = await axios.post(
          "http://localhost:4000/login",
          {
            email,
            password,
          },
          { withCredentials: true }
        );
        if (data.data.Success) {
          toast.success("Login Successfull");
          navigate("/");
        } else {
          toast.error(data.data.message);
        }
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      toast.error("Opps! something went wrong");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };
  return (
    <div>
      <div>
        <div className="flex flex-col h-screen items-center justify-center gap-3">
          <h2 className="text-2xl">Login</h2>
          <form
            action=""
            className="flex flex-col gap-4 items-center justify-center"
            onSubmit={(e) => handleSubmit(e)}
          >
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
            <button className="border-black border">Login</button>
            <div>
              Didn't have an account ?{" "}
              <Link to="/register" className="text-blue-500">
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
