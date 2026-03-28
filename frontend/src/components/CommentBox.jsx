import { useState } from "react";

import API from "../api/axios";

function CommentBox({ postId, refreshComments }) {
    const [text, setText] = useState("");

    const handleComment = async (e) => {
        e.preventDefault();
        if (!text) {
            return;
        }

        try {
            await API.post(
                `/posts/${postId}/comment`,
                {
                    text
                }
            );
            setText("");
            refreshComments();
        }
        catch (error) {
            console.log(error);
        }

    };

    return (
        <form onSubmit={handleComment}>
            <input
                type="text"
                placeholder="Write comment..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <button type="submit">
                Comment
            </button>

        </form>

    );

}

export default CommentBox;