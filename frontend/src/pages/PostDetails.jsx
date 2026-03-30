import { useParams } from "react-router-dom";
import PostCard from "../components/PostCard"
import { useEffect, useState } from "react";
import API from "../api/axios";
import CommentBox from "../components/CommentBox";
import CommentCard from "../components/CommentCard";

const PostDetails = () => {
    const params = useParams()
    const id = params.id
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchPostBYId = async () => {
        try {
            setLoading(true)
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

    const deleteComment = async (commentId) => {
        try {
            await API
                .patch(`/posts/${id}/comment/${commentId}`)
            await fetchPostBYId()
        } catch (error) {
            console.log(error)
        }
    }

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
                        <CommentCard
                            comment={comment}
                            onClick={() => deleteComment(comment._id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PostDetails