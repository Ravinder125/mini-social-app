import { useEffect, useState } from "react";
import API from "../api/axios";
import PostCard from "../components/PostCard";
import CreatePost from "../components/CreatePost";
import Navbar from '../components/layout/Navbar';
import CustomPagination from '../components/CustomPagination'

function Social() {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        try {
            const res = await API.get(`/posts?page=${page}&limit=5`);

            setPosts(res.data.data.posts);
            setPage(res.data.data.page);
            setTotalPages(res.data.data.totalPages);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    };

    const deletePost = async (id) => {
        try {
            await API.delete(`/posts/${id}`)
            await fetchPosts()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPosts();
    }, [page]);

    if (loading) return <h3>Loading...</h3>

    if (posts.length === 0) {
        return (
            <div>
                <Navbar />
                <h3>No posts yet</h3>
                <CreatePost refresh={fetchPosts} />
            </div>
        );

    }

    return (

        <div className="container">
            <Navbar />
            <h2 style={{ marginBottom: "20px" }}>Social Feed</h2>
            <CreatePost refresh={fetchPosts} />

            {
                posts.map(post => (

                    <PostCard
                        key={post._id}
                        post={post}
                        onDelete={deletePost}
                    />
                ))
            }

            <CustomPagination page={page} setPage={(pageNum) => setPage(pageNum)} totalPages={totalPages} />

        </div>

    );

}

export default Social;