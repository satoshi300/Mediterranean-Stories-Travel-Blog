import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { client } from "./prismic";
import { PrismicImage, PrismicRichText } from "@prismicio/react";
import "./Page.css";
import Nav from "./Nav";

const BlogPost = () => {
    const { uid } = useParams();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setPost(null);
        setError(null);

        client.getByUID("blog_post", uid)
            .then((resp) => {
                setPost(resp);
            })
            .catch((error) => {
                console.error(error);
                setError("The post could not be loaded.");
            });
    }, [uid]);

    if (error) {
        return (
            <main className="post-page">
                <p className="blog-status" role="alert">{error}</p>
                <Link className="post-page__back" to="/">← Back to Homepage</Link>
            </main>
        )
    }

    if (!post) {
        return <p className="blog-status" role="status">Loading post...</p>
    }



    return (
        <main className="post-page">
            <Nav />
            <Link className="post-page__back" to="/">← Back to Homepage</Link>
            <article className="blog__article post-page__article">
                <h1>{post.data.title}</h1>
                <PrismicImage field={post.data.featured_image} />
                <div className="post-page__content">
                    <PrismicRichText field={post.data.content} />
                </div>
            </article>
        </main>
    )
};

export default BlogPost;
