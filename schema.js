const joi=require("joi");

module.exports.blogSchema=joi.object({
    blog:joi.object({
        title:joi.string().required(),
        description:joi.string().required(),
        image:joi.string().required()
    }).required()
}); 
 