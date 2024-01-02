
import { useState, useEffect } from "react";
import Bloglist from "./Blogslist";
import Usefetch from "./fetch";








const Home = () => {
    const Blogs = Usefetch("http://localhost:8000/blogs");
   

    return (
        <div className="home">
            {Blogs && <Bloglist title="My-blog" Blogs={Blogs} />}
        </div>
    );
}

export default Home;