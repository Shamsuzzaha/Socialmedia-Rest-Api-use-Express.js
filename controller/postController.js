import PostModel from '../model/postModel.js';
import UserModel from "../model/userModel.js";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;


// create new post
export const createPost = async (req, res) => {
    try {
        const post = await PostModel.create(req.body)
        res.status(200).json(post)
    }catch(err) {
        res.status(500).json({from: "create post controller", error:err})
    }
}

//get post by id
export const getPost = async(req, res)=>{
    const postId = req.params.id
    try{
        const post = await PostModel.findById(postId)
        res.status(200).json(post)
    }catch (err){
        res.status(500).json({from: "get post by id controller", error: err})
    }
}

//update post by id
export const updatePost = async (req, res) => {
    const postId = req.params.id
    const {userId} = req.body

    try {
        const post = await PostModel.findById(postId)
        if (post['userId'].toString() === userId) {
            await post.updateOne({$set: req.body})
            res.status(200).json("post updated successfully")
        }else{
            res.status(403).json("You are not eligible to edit this post")
        }
    }catch (e) {
        res.status(500).json({from: "update post controller", error: e})
    }
}

//delete post by id
export const deletePost = async (req, res) => {
    const postId = req.params.id
    const {userId} = req.body
    try {
        const post = await PostModel.findById(postId)
        if (post['userId'].toString() === userId) {
            await post.deleteOne()
            res.status(200).json("post deleted successfully")
        }else{
            res.status(403).json("You are not eligible to delete this post")
        }
    }catch (e) {
        res.status(500).json({from: "delete post controller", error: e})
    }
}

//like post
export const likePost = async (req, res) => {
    const postId = req.params.id
    const {userId} = req.body

    try{
        const post = await PostModel.findById(postId)

        if (post['like'].includes(userId)) {
            await post.updateOne({$pull : {like: userId}})
            res.status(200).json("Not liked this post")
        }else{
            await post.updateOne({$push : {like: userId}})
            res.status(200).json("liked this post")
        }
    }catch(err){
        res.status(500).json({from: "like post controller", error: err})
    }
}

//get timeline post
export const timelinePost = async (req, res) => {
    const userId = req.params.userId

    try{
        const currentUserPosts = await PostModel.find({userId: userId})
        const followingUserPosts = await UserModel.aggregate([
            {
                $match:{
                    _id : new ObjectId(userId),
                }
            },
            {
                $lookup:{
                    from: "posts",
                    localField: "following",
                    foreignField: "userId",
                    as: "followingUserPosts"
                }
            },
            { $unwind: "$followingUserPosts" }, // Flatten the array
            { $replaceRoot: { newRoot: "$followingUserPosts" } } // Remove unnecessary nesting
            ])
        const timeline = currentUserPosts.concat(followingUserPosts).sort((a,b)=>{return b.updatedAt - a.updatedAt})
        res.status(200).json(timeline);
    }catch(err){
        res.status(500).json({from: "timeline post controller", error: err})
    }
}