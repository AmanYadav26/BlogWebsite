import { useHistory } from "react-router-dom";
import React from 'react';
import './register.css';
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function registerUser(history) {
    var data = {
        username: document.getElementById('register-username').value,
        password: document.getElementById('register-password').value
    };

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/register', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function(){
        if (xhr.readyState === 4 && xhr.status === 201) {
            history.push('/login');
        }
    };
    xhr.send(JSON.stringify(data));
}

const Register = () => {
    const history = useHistory();

    return (
        <>
        <div className="register"> 
            <h2>User Registration</h2>
            <div class="row g-3">
            <input type="text" id="register-username" className="form-control" placeholder="Username" />
            <input type="password" id="register-password" className="form-control" placeholder="Password" />
            <button className="btn btn-primary mt-3" onClick={() => registerUser(history)}>Register</button>
            <h5>Already registered<Link to="/login">Login</Link></h5>
            </div>
        </div>
        </>
    );
}

export default Register;
