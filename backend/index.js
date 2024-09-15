const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const mongoURI = "mongodb://localhost:27017/Blogwebsite";
mongoose.connect(mongoURI);

//User model
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const User = mongoose.model("User", UserSchema);

//Post model
const PostSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  title: String,
  date: String,
  body: String,
});
const Post = mongoose.model("Post", PostSchema);

//verify token
function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token)
    return res.status(403).send("A token is required for authentication");
  try {
    req.user = jwt.verify(token.split(" ")[1], "YOUR_SECRET_KEY");
    next();
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
}

app.post("/register", async (req, res) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).send("User register succesfull");
  } catch (error) {
    res.status(500).send("Error");
  }
});

app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign({ userId: user._id }, "YOUR_SECRET_KEY");
      res.json({ token });
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    res.status(500).send("Error during login");
  }
});

//create a post
app.post("/posts", verifyToken, async (req, res) => {
  try {
    const post = new Post({
      userId: req.user.userId,
      title: req.body.title,
      body: req.body.body,
      date: req.body.date,
    });
    await post.save();
    res.status(201).send("Post created successfully");
  } catch (error) {
    res.status(500).send("Error creating post");
  }
});

app.get("/posts", verifyToken, async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).send("Error fetching posts");
  }
});

app.get("/posts/:postId", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).send("Post not found");
    }
    res.json(post);
  } catch (error) {
    res.status(500).send("Error fetching post");
  }
});

app.delete("/posts/:postId", verifyToken, async (req, res) => {
  try {
    const result = await Post.findOneAndDelete({
      _id: req.params.postId,
      userId: req.user.userId,
    });
    if (!result) {
      alert("cannot find post");
      return res.status(404).send("Post not found or unauthorized");
    }
    res.status(200).send("Post deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting post");
  }
});

app.put("/posts/:postId", verifyToken, async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params.postId,
      userId: req.user.userId,
    });
    if (!post) return res.status(404).send("Post not found or unauthorized");
    post.title = req.body.title;
    post.body = req.body.body;
    await post.save();
    res.status(200).send("Post updated successfully");
  } catch (error) {
    res.status(500).send("Error updating post");
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
