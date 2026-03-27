import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    text: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});

const postSchema = new mongoose.Schema({

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    text: {
        type: String
    },

    image: {
        url: {
            type: String,
            trim: true
        },
        public_id: {
            type: String,
            trim: true
        }
    },

    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],

    comments: [commentSchema]

}, {
    timestamps: true
});

const Post = mongoose.model("Post", postSchema);

export default Post;