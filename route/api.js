import express from "express";
import {loginUser, registerUser} from "../controller/authController.js";
import {deleteUser, followUser, getUser, unfollowUser, updateUser} from "../controller/userController.js";
import {createPost, deletePost, getPost, likePost, timelinePost, updatePost} from "../controller/postController.js";

const router = express.Router()

// -------Auth-User------------
// Registration api
router.post('/auth/register', registerUser)

// Login API
router.post('/auth/login', loginUser)



// ---------User API-------
// get user info API
router.get('/user/:id', getUser);

// update user API
router.put('/user/:id', updateUser)

// delete user
router.delete('/user/:id', deleteUser)

// follow API
router.put('/user/:id/follow', followUser)

// unfollow user
router.put('/user/:id/unfollow', unfollowUser)



// -----------Post API-------
// create post API
router.post('/post', createPost)

// get post API
router.get('/post/:id', getPost)

// update post API
router.put('/post/:id', updatePost)

// delete post API
router.delete('/post/:id', deletePost)

// like post API
router.put('/post/:id/like', likePost)

// timeline Post API
router.get('/post/:userId/timeline', timelinePost)

export default router;