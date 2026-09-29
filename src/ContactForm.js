import { useEffect, useState } from "react";
import { Link } from "react-router";
import { client } from "./prismic";
// import { PrismicImage, PrismicRichText } from "@prismicio/react";
import "./Page.css";
import Nav from "./Nav";

const ContactForm = () => {
    const [contact, setContact] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // setContact(null);
        setError(null);

        client.getSingle("contact_form")
            .then((resp) => {
                setContact(resp);
            })
            .catch((error) => {
                console.error(error);
                setError("The post could not be loaded.");
            });
    }, []);

    if (error) {
        return <p role="alert">{error}</p>;
    }

    if (!contact) {
        return <p>Loading...</p>;
    }

    console.log(contact)


    return (
        <main className="post-page">
            <Nav />
            <Link className="post-page__back" to="/">← Back to Homepage</Link>
            <h1>{contact.data.slices[0].primary.title}</h1>
            <form action="">
                <label htmlFor="">First Name: <input type="text" />
                </label>
                <label htmlFor="">Last Name: <input type="text" />
                </label>
                <label htmlFor="">Email: <input type="text" />
                </label>
            </form>
            {/* <h1>{contact.data.slices[1].primary.first_name}</h1> */}
            {/* <h1>{contact.data.slices[2].primary.last_name}</h1> */}

            {/* <p>Contact Us</p> */}
        </main>
    )
};

export default ContactForm;
