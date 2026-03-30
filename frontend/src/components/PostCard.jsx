import { useState } from "react";
import CommentBox from './CommentBox'
import API from "../api/axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MdComment } from "react-icons/md";
import { Link } from 'react-router-dom'


function PostCard({ post }) {
    const [likes, setLikes] = useState(post.likesCount);
    const [isLiked, setIsLiked] = useState(post.isLiked);
    const [commentsCount, setCommentsCount] = useState(post.commentsCount)

    const handleLike = async () => {
        try {
            const res = await API.put(
                `/posts/${post._id}/like`
            );
            setLikes(res.data.data.likesCount);
            setIsLiked(res.data.data.liked);
        }
        catch (error) {
            console.log(error);
        }

    };

    const refreshComments = async () => {
        try {
            const res = await API.get("/posts");
            const updated = res.data.data.find(p => p._id = post._id);
            setCommentsCount(updated.commentsCount)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div
            className="card"
        >
            <div className="card-header">
                <h4>
                    {post.author.name}
                </h4>
                <small>
                    {new Date(post.createdAt).toLocaleDateString()}
                </small>
            </div>
            <div className="card-content">
                <p>
                    {post.text}
                </p>

            </div>

            {
                post.image && (
                    <img
                        src={post.image}
                        alt=""
                        style={{
                            width: "100%",
                            borderRadius: "5px",
                            marginTop: "10px",
                        }}
                    />

                )

            }

            <div style={{
                display: "flex",
                marginTop: "20px",
                gap: "20px"
            }}>
                <button
                    className="svg-btn like-btn"
                    onClick={handleLike}
                >
                    {
                        isLiked
                            ? <FaHeart style={{
                                color: "pink",
                                fill: "pink"
                            }} />
                            : <FaRegHeart />
                    }

                    <span style={{ color: isLiked && "pink" }}>
                        {likes}
                    </span>
                </button>
                <button className="svg-btn like-btn">
                    <Link
                        className="comment-link"
                        to={`/posts/${post._id}`}
                    >
                        <MdComment /> {commentsCount}
                    </Link>
                </button>
            </div>


        </div>

    );

}

export default PostCard;