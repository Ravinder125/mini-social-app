import { useState } from "react";

import API from "../api/axios";

function PostCard({ post }) {
    const [likes, setLikes] = useState(post.likesCount);
    const [liked, setLiked] = useState(false);

    const handleLike = async () => {
        try {
            const res = await API.put(
                `/posts/${post._id}/like`
            );
            setLikes(res.data.data.likesCount);
            setLiked(res.data.data.liked);
        }
        catch (error) {
            console.log(error);
        }

    };

    return (
        <div
            style={{
                border: "1px solid gray",
                padding: "10px",
                margin: "10px"
            }}
        >

            <h4>

                {post.author.name}

            </h4>

            <p>

                {post.text}

            </p>

            {
                post.image && (
                    <img
                        src={post.image}
                        alt=""
                        width="200"
                    />

                )

            }

            <button onClick={handleLike}>

                {liked ? "Unlike" : "Like"}

            </button>

            <p>

                Likes: {likes}

            </p>

            <p>

                Comments: {post.commentsCount}

            </p>

        </div>

    );

}

export default PostCard;