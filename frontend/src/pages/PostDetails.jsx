import { useParams } from "react-router-dom";
import PostCard from "../components/PostCard"
import { useEffect, useState } from "react";
import API from "../api/axios";
import CommentBox from "../components/CommentBox";

const PostDetails = () => {
    const params = useParams()
    const id = params.id
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchPostBYId = async () => {
        try {
            const res = await API.get(`/posts/${id}`);
            setPost(res.data.data);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPostBYId()
    }, [])

    if (loading) return <div>Loading...</div>
    return (
        <div className="container">
            <PostCard post={post} />


            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "10px"
                }}
            >
            </div>
            <div style={{ marginTop: "10px" }} className="card">
                <CommentBox postId={post._id} refreshComments={fetchPostBYId} />
                <div className="comments-list">
                    {post.comments?.map(comment => (
                        <div className="comments-card">
                            <div className="comments-card--header">
                                <h4>{comment.user.name}</h4>
                                <small>{(new Date(comment.createdAt).toLocaleDateString())}</small>
                            </div>
                            <h5>{comment.user.email}</h5>
                            <p>{comment.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PostDetails