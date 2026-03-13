const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Blog = require("../models/blog");
const { isLoggedIn, isOwner, validateBlog } = require("../middleware.js");

const blogController = require("../controllers/blogs.js");

router.route("/")
    .get(wrapAsync(blogController.index))
    .post(isLoggedIn, validateBlog, wrapAsync(blogController.createBlog));

router.get("/new", isLoggedIn, blogController.renderNewForm);

router.route("/:id")
    .get(wrapAsync(blogController.showBlog))
    .put(isLoggedIn, isOwner, validateBlog, wrapAsync(blogController.updateBlog))
    .delete(isLoggedIn, isOwner, wrapAsync(blogController.destroyBlog));

router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(blogController.renderEditForm));

module.exports = router;
