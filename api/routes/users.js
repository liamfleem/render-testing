const express = require("express");

const UsersController = require("../controllers/users");

const router = express.Router();

router.post("/", UsersController.create);
router.get("/", UsersController.getAllUsers);
router.get("/:user_id", UsersController.getUserById);
// >>>>these 2 might create a problem
router.put("/:recipient", UsersController.sendFriendRequest);
router.put("/:user_id", UsersController.updateProfile);
// <<<<these 2 might create a problem

module.exports = router;
