import { useState, useEffect } from "react";
import Bloglist from "./Blogslist";
import Usefetch from "./fetch";
import { Link } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const Blogs = Usefetch("https://blogwebsite-backend-yg9k.onrender.com/posts");

  return (
    <div className="home">
      <div
        className="d-flex justify-content-around "
        style={{ background: "#bebebe",height:'3rem',alignItems:'center'}}
      >
        <Link to="/create" className="text-secondary-emphasis text-uppercase" style={{textDecoration:'none'}}>Create blog</Link>
        <Link to="/about" className="text-secondary-emphasis text-uppercase" style={{textDecoration:'none'}}>About Us</Link>
        <Link to="/logout" className="text-secondary-emphasis text-uppercase" style={{textDecoration:'none'}}>
          logout
        </Link>
      </div>
      <div>{Blogs && <Bloglist title="My-blog" Blogs={Blogs} />}</div>
    </div>
  );
};

export default Home;
