import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Usefetch from "./fetch";
import { Link } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";

const Blogdetails = () => {
  var userId = JSON.parse(
    atob(localStorage.getItem("jwtToken").split(".")[1])
  ).userId;
  const history = useHistory();
  const { id } = useParams();
  const Details = Usefetch("http://localhost:3000/posts/" + id);
  const handleDelete = () => {
    console.log("Details:", Details);
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "http://localhost:3000/posts/" + id, true);
    xhr.setRequestHeader(
      "Authorization",
      "Bearer " + localStorage.getItem("jwtToken")
    );
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          alert("Post deleted successfully");
          history.push("/Home");
        } else {
          alert("Error deleting post");
        }
      }
    };

    xhr.send();
  };
  const edit = () => {
    localStorage.setItem("editPostId", id);
  };

  console.log("Details:", Details);

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
                className="btn btn-secondary text-start"
                style={{ width: "fit-content" }}
                onClick={handleDelete}
                >
                Delete
              </button>
                <Link to="/editpost">
                  <button
                    className="btn btn-secondary text-start"
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
