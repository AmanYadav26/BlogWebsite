const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB Error:", err));


// User Schema
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const User = mongoose.model("User", UserSchema);

// Post Schema
const PostSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  title: String,
  date: String,
  body: String,
});
const Post = mongoose.model("Post", PostSchema);


// Middleware: Verify JWT Token
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(403).json({ message: "A token is required for authentication" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "Token format is invalid" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
app.get("/ping", (req, res) => {
  console.log("Ping received at:", new Date().toISOString());
  res.status(200).send("Server is awake");
});



// Register Route
// Register Route
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).send("Error registering user");
  }
});




// Login Route
app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(401).send("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res.status(401).send("Invalid credentials");
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });

  } catch (error) {
    console.error(error);
    res.status(500).send("Error during login");
  }
});



// Create Post
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


// Get All Posts
app.get("/posts", verifyToken, async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).send("Error fetching posts");
  }
});


// Get Single Post
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


// Delete Post
app.delete("/posts/:postId", verifyToken, async (req, res) => {
  try {
    const result = await Post.findOneAndDelete({
      _id: req.params.postId,
      userId: req.user.userId,
    });

    if (!result) {
      return res.status(404).send("Post not found or unauthorized");
    }

    res.status(200).send("Post deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting post");
  }
});


// Update Post
app.put("/posts/:postId", verifyToken, async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params.postId,
      userId: req.user.userId,
    });

    if (!post) {
      return res.status(404).send("Post not found or unauthorized");
    }

    post.title = req.body.title;
    post.body = req.body.body;

    await post.save();
    res.status(200).send("Post updated successfully");
  } catch (error) {
    res.status(500).send("Error updating post");
  }
});


// Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
