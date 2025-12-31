import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Todo() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const fetchTodos = async () => {
    const res = await api.get("/api/todos");
    setTodos(res.data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-blue-700 flex justify-center pt-16">
      <div className="bg-white w-96 p-6 rounded shadow">
        <div className="flex justify-between mb-4">
          <h2 className="font-bold text-lg">
            Welcome {username}
          </h2>
          <button onClick={logout} className="text-red-600">Logout</button>
        </div>

        <div class="text-0.5xl font- italic">
          Add your task's once completed remove it
        </div>

        <div className="flex gap-2 mb-4">
          <input className="border flex-1 p-2" value={task} onChange={e=>setTask(e.target.value)} />
          <button className="bg-indigo-600 text-white px-4" onClick={()=>api.post("/api/todos",{task}).then(fetchTodos)}>Add</button>
        </div>

        {todos.map(t=>(
          <div key={t.id} className="flex justify-between bg-gray-100 p-2 mb-2">
            {t.task}
            <button className="text-red-600" onClick={()=>api.delete(`/api/todos/${t.id}`).then(fetchTodos)}>✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}
