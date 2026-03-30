import { useEffect, useState } from "react";
import API from "../api/axios";
import PostCard from "../components/PostCard";
import CreatePost from "../components/CreatePost";
import Navbar from '../components/layout/Navbar'
import { useAuth } from "../context/AuthContext";

function Social() {
    const { user } = useAuth()
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        try {
            const res = await API.get("/posts");
            setPosts(res.data.data);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

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
            {
                user && <CreatePost refresh={fetchPosts} />
            }
            {
                posts.map(post => (

                    <PostCard
                        key={post._id}
                        post={post}
                    />
                ))
            }

        </div>

    );

}

export default Social;