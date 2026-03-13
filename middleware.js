const ExpressError = require("./utils/ExpressError.js");
const { blogSchema } = require("./schema.js");
const Blog = require("./models/blog.js");
const wrapAsync=require("./utils/wrapAsync.js");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash("error", "You must be signed in first!");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.redirectUrl = req.session.returnTo;
    }
    next();
};

module.exports.isOwner = wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    let blog = await Blog.findById(id);
    if (!blog.author.equals(res.locals.currentUser._id)) {
        req.flash("error", "You don't have permission to do that!");
        return res.redirect(`/blogs/${id}`);
    }
    next();
});

module.exports.validateBlog = (req, res, next) => {
    let { error } = blogSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(errMsg, 400);
    } else {
        next();
    }
}
