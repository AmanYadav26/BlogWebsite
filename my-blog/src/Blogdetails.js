import { useParams, useHistory, Link } from "react-router-dom";
import Usefetch from "./fetch";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";

const Blogdetails = () => {
  const history = useHistory();
  const { id } = useParams();
  
  const token = localStorage.getItem("jwtToken");
  const userData = JSON.parse(atob(token.split(".")[1]));
  const userId = userData.userId;

  // Fetch post details
  const Details = Usefetch("http://localhost:5000/posts/" + id);

  // Fast DELETE using fetch()
  const handleDelete = () => {
    fetch(`http://localhost:5000/posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Post deleted successfully");
          history.push("/Home");
        } else {
          alert("Error deleting post");
        }
      })
      .catch((error) => {
        console.error("Delete error:", error);
        alert("Error deleting post");
      });
  };

  const edit = () => {
    localStorage.setItem("editPostId", id);
  };

  return (
    <div className="blog-details">
      {Details && (
        <div className="Details">
          <div className="background">
            <h2 className="text-white ml-5">{Details.title}</h2>
          </div>

          <div className="container mt-5">
            <div className="border-bottom border-2">
              <h5 className="text-start fw-bold">{Details.title}</h5>
            </div>

            <p className="text-start mt-4">{Details.body}</p>

            {Details.userId === userId && (
              <div className="text-start">
                <button
                  className="btn btn-secondary"
                  style={{ width: "fit-content", marginRight: "10px" }}
                  onClick={handleDelete}
                >
                  Delete
                </button>

                <Link to="/editpost">
                  <button
                    className="btn btn-secondary"
                    style={{ width: "fit-content" }}
                    onClick={edit}
                  >
                    Edit
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogdetails;
