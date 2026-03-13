if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const initData = require("./init/data.js");
const Blog = require("./models/blog.js");
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");
const {blogSchema,reviewSchema}=require("./schema.js");
const passport = require("passport");
const LocalStrategy = require("passport-local"); 
const User = require("./models/user.js");
const session = require("express-session");
const flash = require("connect-flash");

const blogRoutes = require("./routes/blogs.js");
const userRoutes = require("./routes/users.js");

const sessionOptions = {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

app.use(session(sessionOptions));
app.use(flash());

app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "public")));

app.use(passport.initialize());
app.use(passport.session()); 
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
  res.locals.currentUser=req.user;
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  next();
});

async function main() {
  const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/blogVerse';
  await mongoose.connect(dbUrl);
  console.log('MongoDB Connected');
}

app.use("/blogs", blogRoutes);
app.use("/", userRoutes); 

main().then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err)
});

app.all(/(.*)/,(req,res,next)=>{
  next(new ExpressError("Page Not Found",404));
});
app.use((err,req,res,next)=>{
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).send(message);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}) 

