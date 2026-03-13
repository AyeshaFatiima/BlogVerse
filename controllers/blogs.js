const Blog = require("../models/blog");

module.exports.index = async (req, res) => {
    const allBlogs = await Blog.find({}).populate("author");
    res.render("listings/index.ejs", { allBlogs });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.createBlog = async (req, res) => {
    const newBlog = new Blog(req.body.blog);
    newBlog.author = req.user._id;
    await newBlog.save();
    req.flash("success", "New Blog Created!");
    res.redirect("/blogs");
};

module.exports.showBlog = async (req, res) => {
    const { id } = req.params;
    const blog = await Blog.findById(id).populate("author");
    if (!blog) {
        req.flash("error", "Blog you requested does not exist!");
        return res.redirect("/blogs");
    }
    res.render("listings/show.ejs", { blog });
};

module.exports.destroyBlog = async (req, res) => {
    const { id } = req.params;
    await Blog.findByIdAndDelete(id);
    req.flash("success", "Blog Deleted Successfully!");
    res.redirect("/blogs");
};

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
        req.flash("error", "Blog you requested does not exist!");
        return res.redirect("/blogs");
    }
    res.render("listings/edit.ejs", { blog });
};

module.exports.updateBlog = async (req, res) => {
    const { id } = req.params;
    await Blog.findByIdAndUpdate(id, req.body.blog);
    req.flash("success", "Blog Updated Successfully!");
    res.redirect(`/blogs/${id}`);
};
