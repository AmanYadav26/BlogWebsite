import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './EditPost.css';

const EditPost = () => {
  const history = useHistory();
  const [post, setPost] = useState({
    title: '',
    body: '',
  });

  useEffect(() => {
    const postId = localStorage.getItem('editPostId');
    const token = localStorage.getItem('jwtToken');

    if (!postId) {
      alert('No post selected for editing');
      return;
    }

    fetch(`https://blogwebsite-20f1.onrender.com/posts/${postId}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch post");
        return res.json();
      })
      .then(data => setPost({ title: data.title, body: data.body }))
      .catch(err => alert("Error fetching post"));
  }, []);

  const submitEdit = () => {
    const postId = localStorage.getItem('editPostId');
    const token = localStorage.getItem('jwtToken');

    fetch(`https://blogwebsite-20f1.onrender.com/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(post),
    })
      .then(res => {
        if (!res.ok) throw new Error("Update Failed");
        alert("Post updated successfully!");
        history.push("/Home");
      })
      .catch(() => alert("Error updating post"));
  };

  return (
    <div className="edit-container">
      <div className="edit-card shadow-lg">

        <div className="edit-header">
          <h3>Edit Blog Post</h3>
        </div>

        <div className="edit-body">

          <label>Title</label>
          <input
            type="text"
            className="form-control mb-3"
            value={post.title}
            onChange={e => setPost({ ...post, title: e.target.value })}
          />

          <label>Body</label>
          <textarea
            className="form-control mb-3"
            value={post.body}
            onChange={e => setPost({ ...post, body: e.target.value })}
          ></textarea>

          <button className="btn Submitedit-btn w-100" onClick={submitEdit}>
            Submit Edit
          </button>

        </div>
      </div>
    </div>
  );
};

export default EditPost;
