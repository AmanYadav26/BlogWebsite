import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Main = () => {
    const history=useHistory();
    if (localStorage.getItem('jwtToken')) {
        history.push('/register')
    } else {
        history.push('/login')
    }
}

export default Main;
