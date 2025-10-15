import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/profile");
    } catch (err) {
      alert(err.response.data.error || "Login failed");
    }
  };

  return (
    <div className="w-50 mx-auto">
      <h2>Employee Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <input type="email" className="form-control" placeholder="Email"
            value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <input type="password" className="form-control" placeholder="Password"
            value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}
