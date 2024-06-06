const express = require("express");

const UsersController = require("../controllers/users");

const router = express.Router();

router.post("/", UsersController.create);
router.get("/", UsersController.getAllUsers);
router.get("/:user_id", UsersController.getUserById);
router.put("/befriend/:recipient", UsersController.sendFriendRequest);
router.put("/:user_id", UsersController.updateProfile);

module.exports = router;
