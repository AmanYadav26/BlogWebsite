import img2 from './assests/bg_image.png';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Bloglist = ({ Blogs, title, Currentday }) => {

  // Function to limit words to 8
  const getPreview = (text, wordLimit = 8) => {
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + " ...";
  };

  return (
    <>
      {/* CURRENT DAY BLOG SECTION */}
      <div className="blog-list">
        <div className="currentday">
          <div>
            {Blogs.map((blog) => {
              if (blog.Currentday) {
                return (
                  <div className="currentblog" key={blog._id}>
                    <h2 className="blog text-start">{blog.title}...</h2>
                    <h5 className="blog text-start">{getPreview(blog.body, 12)}</h5>

                    <Link to={`blogs/${blog._id}`}>
                      Continue reading...
                    </Link>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>

      {/* BLOG LIST GRID */}
      <div className="container-lg mt-3 mb-5">
        <div className="row justify-content-center align-items-center g-5">
          
          {Blogs.map((blog) => (
            !blog.Currentday && (
              <div className="col-lg-6 col-xs-7 blog-preview" key={blog._id}>
                
                <div className="img">
                  {/* 🔥 Lazy-loaded image */}
                  <img 
                    src={img2} 
                    alt="" 
                    className="blog-img"
                    loading="lazy"
                  />
                </div>

                <div className="heading text-start">
                  <h5 className="ms-2">{blog.title}</h5>
                </div>

                <div className="text-start">
                  <small className="text-muted ms-2">{blog.date}</small>
                </div>

                <div className="para text-start" style={{ marginLeft: "7rem" }}>
                  
                  {/* Only show 8 words here */}
                  <p>{getPreview(blog.body, 8)}</p>

                  <div className="link text-start">
                    <Link
                      to={`/posts/${blog._id}`}
                      className="text-decoration-none text-start ms-2"
                    >
                      Continue reading...
                    </Link>
                  </div>

                </div>
              </div>
            )
          ))}

        </div>
      </div>

    </>
  );
};

export default Bloglist;
