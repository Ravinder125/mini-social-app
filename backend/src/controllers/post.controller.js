import Post from "../models/post.model.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { isValidObjectId } from "mongoose";

export const createPost = asyncHandler(async (req, res) => {
    const userId = req.user?._id
    const { text } = req.body;
    const file = req.file;

    if (!text && !file) {
        throw new ApiError(400, "Post must contain text or image")
    }

    let postImageOjb = {}

    if (file) {
        const filePath = file?.path;
        const uploadImage = await uploadOnCloudinary(filePath)
        const { url = null, public_id = null } = uploadImage;
        postImageOjb = { url, public_id }
    }

    const newPost = await Post.create({
        author: userId,
        text,
        image: {
            url: postImageOjb.url,
            public_id: postImageOjb.public_id
        }
    })

    const post = await Post
        .findById(newPost._id)
        .populate("author", "name email")

    return res
        .status(201)
        .json(new ApiResponse(201, post, "Post created"))
});

export const getFeed = asyncHandler(async (req, res) => {
    const posts = await Post.find()
        .populate("author", "name email")
        .sort({ createdAt: -1 });

    const formattedPosts = posts.map(post => ({
        _id: post._id,
        text: posts.text,
        image: post.image?.url,
        author: post.author,
        likesCount: post.likes?.length ?? 0,
        commentsCount: post.comments?.length ?? 0,
        createdAt: post.createdAt
    }))

    return res
        .status(200)
        .json(new ApiResponse(200, formattedPosts, "Post Feed successfully fetched"))
});

export const likePost = asyncHandler(async (req, res) => {

    const { postId } = req.params.id;
    const userId = req.user?._id

    if (!isValidObjectId(postId)) throw new ApiError(400, "Invalid Post ID");

    const post = await Post.findById(postId)

    if (!post) throw new ApiError(404, "No post found");

    const alreadyLiked = post.likes.indexOf(userId);

    if (alreadyLiked !== -1) {
        post.likes = post.likes
            .filter(
                l => l.toString() === userId.toString()
            )
    } else {
        post.likes.push(userId)
    }

    await post.save();

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            {
                likesCount: post.likes?.length ?? 0,
                liked: !alreadyLiked
            },
            alreadyLiked
                ? "Post liked"
                : "Post unliked"
        ))
});

export const addComment = asyncHandler(async (req, res) => {

});