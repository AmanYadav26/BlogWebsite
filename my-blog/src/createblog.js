import { useHistory } from "react-router-dom";

function createPost(history) {
    var data = {
        title: document.getElementById('post-title').value,
        date: document.getElementById('post-date').value,
        body: document.getElementById('post-body').value
    };

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:5000/posts', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('jwtToken'));
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 201) {
                alert('Post created successfully!');
                history.push('/Home');
            } else {
                alert('Error creating post');
            }
        }
    };
    xhr.send(JSON.stringify(data));
}

const CreateBlog = () => {
    const history = useHistory();

    return (
        <div>
            <h2>Create Post</h2>
            <input type="text" id="post-title" placeholder="Post Title" />
            <input type="date" id="post-date" placeholder="Date" />
            <textarea id="post-body" placeholder="Post Content"></textarea>
            <button onClick={() => createPost(history)}>Create Post</button>
        </div>
    );
}

export default CreateBlog;
