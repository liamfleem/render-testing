const Post = require("../models/post");
const { generateToken } = require("../lib/token");
const User = require('../models/user');

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
    // console.log("Retrieved posts:", posts);

    const token = generateToken(req.user_id);
    res.status(200).json({ posts: posts, token: token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};


const updateLikes = async (req, res) => {
  const id = req.body.id;
  const user_id = req.body.user;
  const user_liked = req.body.liked;
  console.log(req.body.user);
  if (user_liked) {
    await Post.findByIdAndUpdate(id, { $push: { like_array: user_id }});
    res.status(200).json({ message: "Added Like" });
  } else {
    await Post.findByIdAndUpdate(id, { $pull: { like_array: user_id }});
    res.status(200).json({ message: "Removed Like" });
  }
};

const createPost = async (req, res) => {
  const user_id = req.user_id; 
  const user = await User.findById(user_id);
  console.log(user)


  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const email = user.email;
  console.log(email)

  const post = new Post({
    ...req.body,
    user: user._id,
    email: user.email  
  });
  await post.save();

  console.log("Post created:", post); 

  const newToken = generateToken(req.user_id);
  res.status(201).json({ message: "Post created", email: user.email, token: newToken });
};

const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
  updateLikes: updateLikes
};

module.exports = PostsController;
