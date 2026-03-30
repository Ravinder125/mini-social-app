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
        const formData = new FormData()
        formData.append("text", text)
        formData.append("image", image)

        try {
            await API.post(
                "/posts",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
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

        <div className="card">
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
                    name="image"
                    placeholder="Image URL (optional)"
                    onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                            setImage(file)
                        }
                    }}
                />

                <button type="submit">

                    Post

                </button>

            </form>

        </div>

    );

}

export default CreatePost;