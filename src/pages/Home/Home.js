import { useState } from "react";
import { Link } from "react-router-dom";
import PostDetail from "../../components/PostDetail/PostDetail";
import { useFetchDocuments } from "../../hooks/useFetchDocument";
import styles from "./Home.module.css";
const Home = () => {
    const [query, setQuery] = useState("");
    const { documents: posts, loading } = useFetchDocuments("posts");

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className={styles.home}>
            <h1>See our latest posts</h1>
            <form onSubmit={handleSubmit} className={styles.search_form}>
                <input
                    type="text"
                    placeholder="Or search by tags"
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className="btn btn-dark">Search</button>
            </form>
            <div>
                {loading && <p>Loading...</p>}
                {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
                {posts && posts.length === 0 && (
                    <div className={styles.noposts}>
                        <p>No posts found</p>
                        <Link
                            to="/posts/create"
                            className="btn"
                        >
                            Create first post
                        </Link>
                    </div>
                )}
            </div>
        </div >
    );
};

export default Home;