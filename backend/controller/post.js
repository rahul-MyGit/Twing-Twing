const User = require('../model/userModel');
const Post = require('../model/postModel');
const { v2 } = require('cloudinary');

const createPost = async (req,res)=>{
    try {
        const {text} = req.body;
        let {img} = req.body;
        const userId = req.user._id.toString();

        const user = await User.findById(userId);
        if(!user){ return res.status(404).json({message: "User not found"})}
        if(!text && !img){
            return res.status(400).json({message: "Text or image is required"});
        }

        if(img){
            const uploadRes = await v2.uploader.upload(img)
            img = uploadRes.secure_url;
        }

        const newPost = new Post({
            user: userId,
            text,
            img
        })
        await newPost.save();

        res.status(201).json(newPost);

    } catch (error) {
        console.log("Error while creating a post: ",error.message);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

const deletePost = async (req,res) =>{
    try {
        const post = await Post.findById(req.params.id)
        if(!post){
            return res.status(404).json({message: "Post not found"});
        }

        if(post.user.toString()!== req.user._id.toString()){
            return res.status(401).json({error: "You are not authorized to delete this post"})
        }

        if(post.img){
            const imgId = post.img.split("/").pop().split(".")[0];
            await v2.uploader.destroy(imgId);
        }

        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({msg: "Post deleted successfully"});
    } catch (error) {
        console.log("Error while deleting a post: ",error.message);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

const commentOnPost = async (req,res)=>{

}

module.exports = {
    createPost,
    deletePost,
    commentOnPost
}