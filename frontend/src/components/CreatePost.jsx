import { useState } from "react";
import API from "../api/axios";

function CreatePost({ refresh }) {
    const [text, setText] = useState("");
    const [image, setImage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text && !image) {
            return;
        }

        try {
            await API.post(
                "/posts",
                {
                    text,
                    image
                }
            );

            setText("");
            setImage("");
            refresh();

        }
        catch (error) {
            console.log(error);
        }

    };

    return (

        <div>
            <h3>Create Post</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="What's on your mind?"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                <input
                    type="file"
                    placeholder="Image URL (optional)"
                    value={image}
                    onChange={(e) => setImage(e.target.files?.[0])}
                />

                <button type="submit">

                    Post

                </button>

            </form>

        </div>

    );

}

export default CreatePost;