
function PostCard({ post }) {
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
            <p>
                Likes: {post.likesCount}

            </p>

            <p>
                Comments: {post.commentsCount}
            </p>

        </div>

    );

}

export default PostCard;