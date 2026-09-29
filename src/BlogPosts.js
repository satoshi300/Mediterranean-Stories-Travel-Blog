import React, { useEffect, useState } from "react";
import { PrismicImage } from "@prismicio/react";
import { Link } from "react-router";
import { client } from "./prismic";

const BlogPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        client.getAllByType("blog_post")
            .then((resp) => {
                setPosts(resp);
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to load blog posts.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="blog-status" role="status">Loading posts...</p>;
    if (error) return <p className="blog-status" role="alert">{error}</p>;
    if (posts.length === 0) return <p className="blog-status">No blog posts</p>;

    return (
        <section className="blog">
            {posts.map((post) => (
                <article key={post.id} className="blog__article">
                    <Link to={`/blog/${post.uid}`} className="blog__card-link">
                        <h2>{post.data.title}</h2>
                        <PrismicImage field={post.data.featured_image} />
                    </Link>
                </article>
            ))}
        </section>
    );
};

export default BlogPosts;
