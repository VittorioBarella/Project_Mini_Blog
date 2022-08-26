import { useState } from "react";
import styles from "./CreatePost.module.css";

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className={styles.create_post}>
            <h2>Create post</h2>
            <p>Write about whatever you want and share your stuff!</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Title:</span>
                    <input
                        type="text"
                        name="title"
                        required
                        placeholder='Think about a good title...'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </label>
                <label>
                    <span>Image url:</span>
                    <input
                        type="text"
                        name="image"
                        required
                        placeholder='Insert an image that represents your post'
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
                    >
                    </textarea>
                </label>
                <label>
                    <span>Tags:</span>
                    <input
                        type="text"
                        name="tags"
                        required
                        placeholder='Enter tags separated by commas'
                        onChange={(e) => setTags(e.target.value)}
                        value={tags}
                    />
                </label>
                <button className="btn">Register</button>
                {/* {!loading && <button className="btn">Register</button>}
                {loading && (
                    <button className="btn" disabled>
                        Wait...
                    </button>
                )}
                {error && <p className="error">{error}</p>} */}
            </form>
        </div>
    );
};

export default CreatePost;