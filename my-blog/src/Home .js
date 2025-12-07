import { Link } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Bloglist from "./Blogslist";
import Usefetch from "./fetch";

const Home = () => {
  const Blogs = Usefetch("https://blogwebsite-20f1.onrender.com/posts");

  return (
    <div className="home">

      {/* Modern Colorful Header Bar */}
      <div className="home-header shadow-sm">
        <Link to="/create" className="home-link">Create Blog</Link>
        <Link to="/about" className="home-link">About Us</Link>
        <Link to="/logout" className="home-link">Logout</Link>
      </div>

      {/* Blog List Component */}
      <div>{Blogs && <Bloglist title="My-blog" Blogs={Blogs} />}</div>

    </div>
  );
};

export default Home;
