import { useState } from "react";
import { useHistory } from "react-router-dom";

const CreateBlog = () => {
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [body, setBody] = useState("");

  const createPost = async () => {
    try {
      const response = await fetch("https://blogwebsite-20f1.onrender.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
        body: JSON.stringify({ title, date, body }),
      });

      if (response.status === 201) {
        alert("Post created successfully!");
        history.push("/Home");
      } else {
        alert("Error creating post");
      }
    } catch (error) {
      console.error("Create post error:", error);
      alert("Error creating post");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
        padding: "20px"
      }}
    >
      <div
        className="card p-4 shadow-lg border-0"
        style={{
          width: "100%",
          maxWidth: "650px",
          borderRadius: "18px",
          background: "#ffffffdd",
          backdropFilter: "blur(6px)"
        }}
      >
        <h2 className="text-center mb-4" style={{ fontWeight: "600", color: "#333" }}>
          ✨ Create New Blog Post
        </h2>

        <div className="mb-3">
          <label className="form-label fw-semibold">Post Title</label>
          <input
            type="text"
            className="form-control shadow-sm"
            placeholder="Enter a catchy title..."
            style={{ borderRadius: "10px" }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Date</label>
          <input
            type="date"
            className="form-control shadow-sm"
            style={{ borderRadius: "10px" }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Post Content</label>
          <textarea
            className="form-control shadow-sm"
            rows="6"
            placeholder="Write something meaningful..."
            style={{ borderRadius: "10px" }}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>

        <button
          className="btn w-100"
          onClick={createPost}
          style={{
            background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
            color: "white",
            borderRadius: "12px",
            padding: "10px 0",
            fontSize: "18px",
            fontWeight: "600",
            transition: "0.3s"
          }}
        >
          Create Post 🚀
        </button>
      </div>
    </div>
  );
};

export default CreateBlog;
