const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const blogSchema=new Schema({
  title:{
    type: String,
    required: true
  },
  description:{
    type: String,
    requird:true
  },
  image:{
    type: String,
    default: "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
    set: (v) => v === "" ? "https://images.unsplash.com/photo-1499750310107-5fef28a66643" : v,
  },
  createdAt:{
    type:Date,
    default: Date.now
  },
  author:{
    type:Schema.Types.ObjectId,
    ref:"User"
  } 
});
const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog; 