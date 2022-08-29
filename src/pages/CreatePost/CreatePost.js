import styles from "./CreatePost.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState("");

    const { user } = useAuthValue();

    const navigate = useNavigate();

    const { insertDocument, response } = useInsertDocument("posts");

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError("");

        // validate image
        try {
            new URL(image);
        } catch (error) {
            setFormError("The image must be a URL.");
        }

        // create tags array
        const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

        // check values
        if (!title || !image || !tags || !body) {
            setFormError("Please fill in all fields!");
        }

        console.log(tagsArray);

        console.log({
            title,
            image,
            body,
            tags: tagsArray,
            uid: user.uid,
            createdBy: user.displayName,
        });

        if (formError) return;

        insertDocument({
            title,
            image,
            body,
            tags: tagsArray,
            uid: user.uid,
            createdBy: user.displayName,
        });

        // redirect to home page
        navigate("/");
    };

    return (
        <div className={styles.create_post}>
            <h2>Create post</h2>
            <p>Write about whatever you want and share your memories!</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Title:</span>
                    <input
                        type="text"
                        name="text"
                        required
                        placeholder="Think of a good title..."
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </label>
                <label>
                    <span>Image Url:</span>
                    <input
                        type="text"
                        name="image"
                        required
                        placeholder="Insert an image that represents your post"
                        onChange={(e) => setImage(e.target.value)}
                        value={image}
                    />
                </label>
                <label>
                    <span>Content:</span>
                    <textarea
                        name="body"
                        required
                        placeholder="Insert post content"
                        onChange={(e) => setBody(e.target.value)}
                        value={body}
                    ></textarea>
                </label>
                <label>
                    <span>Tags:</span>
                    <input
                        type="text"
                        name="tags"
                        required
                        placeholder="Enter tags separated by comma"
                        onChange={(e) => setTags(e.target.value)}
                        value={tags}
                    />
                </label>
                {!response.loading && <button className="btn">Create post!</button>}
                {response.loading && (
                    <button className="btn" disabled>
                        Wait.. .
                    </button>
                )}
                {(response.error || formError) && (
                    <p className="error">{response.error || formError}</p>
                )}
            </form>
        </div>
    );
};

export default CreatePost;
