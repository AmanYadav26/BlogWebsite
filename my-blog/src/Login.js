import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {Link} from 'react-router-dom';
import './login.css'

function loginUser(history) {
    
  var data = {
    username: document.getElementById("login-username").value,
    password: document.getElementById("login-password").value,
  };
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:3000/login", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      console.log(response.token);
      localStorage.setItem("jwtToken", response.token);
      history.push('/Home');
    }
  };
  xhr.send(JSON.stringify(data));
}

const Login = () => {
  const history = useHistory();
  return (
    <div className="login">
      <h2>User Login</h2>
      <input type="text" id="login-username" placeholder="Username" />
      <input type="password" id="login-password" placeholder="Password" />
      <button onClick={() => loginUser(history)}>Login</button>
      <p>
        If not registered, <Link to="/register">create an account</Link>.
      </p>
    </div>
  );
};




export default Login;
