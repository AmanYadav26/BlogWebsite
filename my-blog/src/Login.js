import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import "./login.css";

const Login = () => {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    try {
      const response = await fetch("https://blogwebsite-20f1.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem("jwtToken", data.token);
        history.push("/Home");
      } else {
        alert("Invalid username or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Error logging in");
    }
  };

  return (
    <div className="login">
      <h2>User Login</h2>
      <input 
        type="text" 
        placeholder="Username" 
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input 
        type="password" 
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={loginUser}>Login</button>

      <p>
        If not registered, <Link to="/register">create an account</Link>.
      </p>
    </div>
  );
};

export default Login;
