import { useState } from "react";
import API from "../api/axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MdComment } from "react-icons/md";
import { Link } from 'react-router-dom'
import DeleteBtn from "./DeleteBtn";


function PostCard({ post, onDelete }) {
    const [likes, setLikes] = useState(post.likesCount);
    const [isLiked, setIsLiked] = useState(post.isLiked);
    const [loadingLike, setLoadingLiked] = useState(false)
    const [commentsCount, setCommentsCount] = useState(post.commentsCount)

    const handleLike = async () => {
        const previousIsLiked = isLiked;
        const previousLikes = likes;

        const newLiked = !isLiked;
        setIsLiked(newLiked);

        setLikes(
            newLiked
                ? likes + 1
                : likes - 1
        )

        try {
            setLoadingLiked(true)
            const res = await API.put(
                `/posts/${post._id}/like`
            );
            setLikes(res.data.data.likesCount);
            setIsLiked(res.data.data.liked);
        }
        catch (error) {
            setLikes(previousLikes)
            setIsLiked(previousIsLiked)
            console.log(error);
        } finally {
            setLoadingLiked(false)
        }

    };

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
                    disabled={loadingLike}
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
                {
                    post.canDelete && (
                        <DeleteBtn id={post._id} onClick={(id) => onDelete(id)} />
                    )
                }
            </div>


        </div>

    );

}

export default PostCard;