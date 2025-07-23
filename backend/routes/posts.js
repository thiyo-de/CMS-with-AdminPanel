const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const postController = require("../controllers/postController");

// Public Routes
router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPostById);

// Admin Routes (Protected)
router.post("/", verifyToken, postController.createPost);
router.put("/:id", verifyToken, postController.updatePost);
router.delete("/:id", verifyToken, postController.deletePost);

module.exports = router;
