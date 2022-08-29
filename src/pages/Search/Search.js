// CSS
import styles from "./Home.module.css";

// hooks
import { Link, useNavigate } from "react-router-dom";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

// react
import { useState } from "react";

// components
import PostDetail from "../../components/PostDetail/PostDetail";

const Home = () => {
    const { documents: posts, loading } = useFetchDocuments("posts");

    const navigate = useNavigate();

    const [query, setQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (query) {
            return navigate(`/search?q=${query}`);
        }
    };

    console.log(loading);

    return (
        <div className={styles.home}>
            <h1>See our latest posts</h1>
            <form className={styles.search_form} onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Ou busque por tags..."
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className="btn btn-dark">Search</button>
            </form>
            <div className="post-list">
                {loading && <p>Loading...</p>}
                {posts && posts.length === 0 && (
                    <div className={styles.noposts}>
                        <p>No posts found</p>
                        <Link to="/posts/create" className="btn">
                            Create first post
                        </Link>
                    </div>
                )}
                {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
            </div>
        </div>
    );
};

export default Home;