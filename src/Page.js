import React, { useEffect, useState } from "react";
import { PrismicRichText, PrismicImage, PrismicLink } from "@prismicio/react";
import { Link } from "react-router";
import { client } from './prismic'
import BlogPosts from "./BlogPosts";
import Nav from "./Nav";
import './Page.css'

const Page = () => {
    const [page, setPage] = useState(null);

    useEffect(() => {
        client
            .getSingle('homepage', {
                fetchLinks: ['blog_post.title', 'blog_post.content'],
            })
            .then((resp) => {
                console.log(resp)
                setPage(resp)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])


    if (!page) {
        return <p className="page-status">Loading...</p>
    }

    const hero = page.data.slices.find((slice) => slice.slice_type === 'hero')

    if (!hero) {
        return <p>The "hero" section was not found</p>
    }
    const cardGrid = page.data.slices.find((slice) => slice.slice_type === 'card_grid')

    if (!cardGrid) {
        return <p>The "Card Grid" section was not found</p>
    }

    const resourceLinks = page.data.slices.find(
        (slice) => slice.slice_type === "resource_links"
    );

    if (!resourceLinks) {
        return <p>The "Resource Links" section was not found</p>
    }

    return (
        <main className="landing-page">
            <Nav />
            <header className="hero">
                <PrismicImage
                    field={hero.primary.background_image}
                    className="hero__background"
                    widths={[400, 800, 1600]}
                />
                <div className="hero__overlay" />
                <div className="hero__content">
                    <PrismicImage field={hero.primary.logo} className="hero__logo" />
                    <PrismicRichText field={hero.primary.headline} />
                    <PrismicRichText field={hero.primary.description} />
                    <PrismicImage field={hero.primary.interface_image} className="hero__interface" />
                </div>
            </header>
            <BlogPosts />

            <section className="card-grid" aria-label="Features">
                {cardGrid.primary.cards.map((card, index) => (
                    <article className="feature-card" key={index}>
                        <PrismicImage field={card.image} className="feature-card__image" />
                        <div className="feature-card__content">
                            <h2>{card.title}</h2>
                            <PrismicRichText field={card.description} />
                        </div>
                    </article>))}
            </section>
            <section className="resources">
                <div className="resources__heading">
                    <span>Resources</span>
                    <h2>{resourceLinks?.primary.cta_heading}</h2>
                </div>
                <div className="resources__grid">
                    {resourceLinks?.primary.resources.map((link, index) => (
                        <article className="resource-card" key={index}>
                            <h3>{link.title}</h3>
                            <p>{link.description}</p>
                            {link.add_link?.link_type === "Document" && link.add_link.type === "blog_post" ? (
                                <Link className="resource-card__link" to={`/blog/${link.add_link.uid}`}>
                                    {link.add_link.text} <span aria-hidden="true">→</span>
                                </Link>
                            ) : (
                                <PrismicLink className="resource-card__link" field={link.add_link}>
                                    {link.add_link?.text} <span aria-hidden="true">→</span>
                                </PrismicLink>
                            )}
                        </article>
                    ))}
                </div>
            </section>
        </main>
    )
}

export default Page;
