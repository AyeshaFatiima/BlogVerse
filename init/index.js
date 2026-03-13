const mongoose=require('mongoose');
const initData = require("./data.js");
const Blog = require("../models/blog.js");

async function main(){
  await mongoose.connect('mongodb://127.0.0.1:27017/blogVerse');
  console.log('MongoDB Connected');
}
main().then(()=>{
  console.log('Connected to DB for seeding');
})

const initDB=async()=>{
  const Blog=require('../models/blog');
  await Blog.deleteMany({});
  const {data}=require('./data');
  await Blog.insertMany(data);
  console.log('Database seeded with sample blogs');
}

initDB();