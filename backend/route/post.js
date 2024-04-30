const express = require("express");
const protectRoute = require("../middleware/protectRoute");
const { createPost, deletePost, commentOnPost, likeUnLikeOnPost, getAllPosts } = require("../controller/post");
const postRouter = express.Router();


postRouter.get('/all', protectRoute, getAllPosts)
postRouter.post("/create", protectRoute, createPost);
postRouter.put("/like/:id", protectRoute, likeUnLikeOnPost);
postRouter.put("/comment/:id", protectRoute, commentOnPost)
postRouter.delete("/:id", protectRoute, deletePost);

module.exports = postRouter