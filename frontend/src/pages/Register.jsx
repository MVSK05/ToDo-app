import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    if (!username || !email || !password) return alert("All fields required");

    await axios.post("http://localhost:5001/api/auth/register", {
      username,
      email,
      password,
    });

    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-200">
      <div className="bg-white p-8 rounded w-80">
        <h2 className="text-xl font-bold mb-4">Register</h2>
        <input className="border p-2 w-full mb-3" placeholder="Username" onChange={e=>setUsername(e.target.value)} />
        <input className="border p-2 w-full mb-3" placeholder="Email" onChange={e=>setEmail(e.target.value)} />
        <input className="border p-2 w-full mb-4" type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
        <button className="bg-purple-600 text-white w-full py-2 rounded" onClick={submit}>Register</button>
      </div>
    </div>
  );
}
