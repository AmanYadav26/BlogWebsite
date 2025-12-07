import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import "./register.css";

const Register = () => {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {
    try {
      const response = await fetch("https://blogwebsite-20f1.onrender.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (response.status === 201) {
        history.push("/login");
      } else {
        alert("Registration failed");
      }
    } catch (err) {
      console.error("Register error:", err);
    }
  };

  return (
    <div className="register">
      <h2>User Registration</h2>

      <input
        type="text"
        placeholder="Username"
        className="form-control"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="btn btn-primary mt-3" onClick={registerUser}>
        Register
      </button>

      <h5>
        Already registered? <Link to="/login">Login</Link>
      </h5>
    </div>
  );
};

export default Register;
