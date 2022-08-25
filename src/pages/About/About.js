import styles from "./About.module.css";
import { Link } from "react-router-dom";

const About = () => {
    return (
        <div className={styles.about}>
            <h2>
                About the Mini <span>Blog</span>
            </h2>
            <p>
                This project consists of a blog made with React on the frontend and Firebase on the backend
            </p>
            <Link to="/posts/create" className="btn">
                Create Post
            </Link>
        </div>
    );
};

export default About;