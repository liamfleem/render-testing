const User = require("../models/user");
const slugify = require("../lib/slugify");
const { generateToken } = require("../lib/token");

const create = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const fullName = req.body.fullName
  const slug = slugify(fullName)

  const user = new User({fullName, email, password, slug });
  user.save()
    .then(() => {
      res.status(201).json({ message: "OK" });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ message: "Something went wrong" });
    });
};

const getAllUsers = async (req, res) => {
  const users = await User.find();
  const token = generateToken(req.user_id);
  res.status(200).json({ users: users, token: token });
};

const sendFriendRequest = async (req, res) => {
  const recipient = req.body.recipient;
  const sender = req.body.sender;
  const adding = req.body.adding;
  if (adding) {
    await User.findByIdAndUpdate(recipient, { $push: { friend_req: sender }});
    res.status(200).json({ message: "Sent request" });
  } else {
    await User.findByIdAndUpdate(recipient, { $pull: { friend_req: sender }});
    res.status(200).json({ message: "Removed request" });
  }
}

const getUserById = async (req, res) => {
  const user_id = req.params.user_id;
  
  try {
    const user = await User.findById(user_id); // same as User.findOne( {_id: user_id});
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const token = generateToken(req.user_id);
    res.status(200).json({ message: "Profile fetched successfully", user: user , token: token });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateProfile = async (req, res) => {
  const user_id = req.params.user_id;

  try {
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const updatedUser = await User.findByIdAndUpdate(user_id, { $set: req.body}, { new: true });
    res.status(200).json({ message: "Profile updated successfully", updatedUser: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const UsersController = {
  create: create,
  getUserById: getUserById,
  updateProfile: updateProfile,
  getAllUsers: getAllUsers,
  sendFriendRequest: sendFriendRequest
};

module.exports = UsersController;
