import img2 from './assests/bg_image.png';


import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
const Bloglist = ({ Blogs, title, Currentday }) => {



    return (

        <>



            <div className="blog-list">
                <div className="currentday">
                    <div>
                        {Blogs.map((blog) => {
                            if (blog.Currentday) {
                                return (
                                    <div className="currentblog" key={blog.id}>
                                        <h2 className="blog text-start">{blog.title}...</h2>
                                        <h5 className="blog text-start">{blog.body}</h5>
                                        <Link to={`blogs/${blog.id}`} >
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



            <div className="container-lg mt-3 mb-5">
                <div className="row justify-content-center align-items-center g-5 ">
                    {Blogs.map((blog) => (
                        
                        !blog.Currentday && (
                            
                            <div className="col-lg-6 col-xs-7 blog-preview" key={blog.id}>
                                <div className="img">
                                    <img src={img2} alt="" />
                                </div>
                                <div className="heading text-start">
                                    <h5 className="ms-2">{blog.title}</h5>
                                </div>
                                <div className="text-start">
                                    <small className="text-muted ms-2"> {blog.date} </small>
                                </div>
                                <div className="para text-start" style={{ "marginLeft": "7rem" }}>
                                    <p>{blog.body}</p>
                                    <p>{blog.id}</p>
                                    <div className="link text-start">
                                    <Link to={`/posts/${blog._id}`} className="text-decoration-none text-start ms-2 ">
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
}

export default Bloglist;