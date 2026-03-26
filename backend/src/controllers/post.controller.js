import Post from "../models/post.model.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";

export const createPost = asyncHandler(async (req, res) => {
    const userId = req.user?._id
    const { text } = req.body;
    const file = req.file

    if (!text && !file) {
        throw new ApiError(400, "Post must contain text or image")
    }

    const newPost = await Post.create({
        author: userId,
        text,
        image: {
            imageUrl,
            publicUrl
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

});

export const likePost = asyncHandler(async (req, res) => {

});

export const addComment = asyncHandler(async (req, res) => {

});