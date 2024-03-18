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
    if (!postId) {
      alert('No post selected for editing');
      return;
    }

    fetch(`http://localhost:3000/posts/${postId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
      },
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error fetching post details');
        }
      })
      .then(postData => {
        setPost({
          title: postData.title,
          body: postData.body,
        });
      })
      .catch(error => {
        console.error(error);
        alert('Error fetching post details');
      });
  }, []);

  const submitEdit = () => {
    const data = {
      title: post.title,
      body: post.body,
    };

    fetch(`http://localhost:3000/posts/${localStorage.getItem('editPostId')}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (response.ok) {
          alert('Post updated successfully!');
          history.push('/Home');
        } else {
          throw new Error('Error updating post');
        }
      })
      .catch(error => {
        console.error(error);
        alert('Error updating post');
      });
  };

  return (
    <div>
      <label>Title:</label>
      <input
        type="text"
        id="edit-post-title"
        value={post.title}
        onChange={e => setPost({ ...post, title: e.target.value })}
      />
      <br />
      <label>Body:</label>
      <textarea
        id="edit-post-content"
        value={post.body}
        onChange={e => setPost({ ...post, body: e.target.value })}
      />
      <br />
      <button onClick={submitEdit}>Submit Edit</button>
    </div>
  );
};

export default EditPost;
