import { useParams, useHistory, Link } from "react-router-dom";
import Usefetch from "./fetch";

const Blogdetails = () => {
  const history = useHistory();
  const { id } = useParams();

  const token = localStorage.getItem("jwtToken");
  const userData = JSON.parse(atob(token.split(".")[1]));
  const userId = userData.userId;

  const Details = Usefetch("https://blogwebsite-20f1.onrender.com/posts/" + id);

  const handleDelete = () => {
    fetch(`https://blogwebsite-20f1.onrender.com/posts/${id}`, {
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
        <div style={{ width: "100%" }}>
          
          {/* Banner */}
          <div className="background">
            <h2>{Details.title}</h2>
          </div>

          {/* Content Card */}
          <div className="blog-content-card">
            <h5>{Details.title}</h5>
            <p>{Details.body}</p>

            {Details.userId === userId && (
              <div className="blog-buttons">

                <button
                  className="btn btn-danger delete-btn"
                  onClick={handleDelete}
                >
                  Delete
                </button>

                <Link to="/editpost" className="edit-link">
                  <button
                    className="btn btn-primary edit-btn"
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
