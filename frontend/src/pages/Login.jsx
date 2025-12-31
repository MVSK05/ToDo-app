import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    if (!email || !password) return alert("All fields required");

    const res = await axios.post("http://localhost:5001/api/auth/login", {
      email,
      password,
    });

    localStorage.setItem("token", res.data.token);
    const payload = JSON.parse(atob(res.data.token.split(".")[1]));
    localStorage.setItem("username", payload.username);
    navigate("/todo");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-300">
      <div className="bg-white p-8 rounded w-80">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input className="border p-2 w-full mb-3" placeholder="Email" onChange={e=>setEmail(e.target.value)} />
        <input className="border p-2 w-full mb-4" type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
        <button className="bg-indigo-600 text-white w-full py-2 rounded" onClick={submit}>Login</button>
        <p className="text-sm mt-3 text-center text-indigo-600 cursor-pointer" onClick={()=>navigate("/register")}>Create account</p>
      </div>
    </div>
  );
}
