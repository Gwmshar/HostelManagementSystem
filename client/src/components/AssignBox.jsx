import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function AssignBox({ a }) {
  const [isCheck, setIsCheck] = useState(false);
  const [afterCheck, setAfterCheck] = useState("");
  const handleCheck = async (a, b, c) => {
    const hostelName = a;
    const hostelRoom = b;
    const email = c;
    await axios
      .post("http://localhost:4000/check", { email, hostelName, hostelRoom })
      .then((res) => {
        setAfterCheck(res.data);
      });
    if (afterCheck.find == true) {
      setIsCheck(true);
    }
  };

  const handleAssign = async (a) => {
    const {
      name,
      email,
      password,
      roomNo,
      rollNo,
      hostelName,
      phoneNo,
      semester,
      branch,
    } = a;
    const hostelRoom = roomNo;
    let studentId;
    await axios
      .post("http://localhost:4000/userassign", {
        name,
        email,
        password,
        roomNo,
        rollNo,
        hostelName,
        phoneNo,
        semester,
        branch,
      })
      .then((res) => {
        studentId = res.data._id;
      });
    await axios.post("http://localhost:4000/hostelassign", {
      studentId,
      hostelName,
      hostelRoom,
    });
    await axios.delete(`http://localhost:4000/assigndelete/${a._id}`);
    window.location.reload();
  };
  const handleDelete = async (a) => {
    try {
      await axios.delete(`http://localhost:4000/userdelete/${a}`);
      toast.success("User is deleted");
      window.location.reload();
    } catch (err) {
      console.log("Error");
    }
  };
  return (
    <>
      <div className="grid grid-cols-2 w-3/4 h-2/4">
        <div>Name: {a.name}</div>
        <div>Email: {a.email}</div>
        <div>Roll No: {a.rollNo}</div>
        <div>Hostel Name: {a.hostelName}</div>
        <div>Room No: {a.roomNo}</div>
        <div>Mobile No: {a.phoneNo}</div>
        <div>Semester: {a.semester}</div>
        <div>Branch: {a.branch}</div>
      </div>
      {afterCheck.message && <div>{afterCheck.message}</div>}
      <div className="flex gap-2">
        {isCheck ? (
          <button
            className="h-8 border border-black"
            onClick={() => handleAssign(a)}
          >
            Assign
          </button>
        ) : (
          <button
            className="h-8 border border-black"
            onClick={() => handleCheck(a.hostelName, a.roomNo, a.email)}
          >
            Check
          </button>
        )}
        <button
          className="h-8 border border-black"
          onClick={() => handleDelete(a._id)}
        >
          Delete
        </button>
      </div>
    </>
  );
}
