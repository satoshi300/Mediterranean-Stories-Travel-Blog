import React, { useEffect, useState } from 'react';
import { PrismicText } from '@prismicio/react';
import { client } from './prismic'
import { Link } from 'react-router';

import './Nav.css';

const Nav = () => {
    const [navData, setNavData] = useState(null)

    useEffect(() => {
        client
            .getSingle('global_nav')
            .then((resp) => {
                console.log('Menu:', resp.data.menu_items);
                setNavData(resp.data)
            })
            .catch((err) => {
                console.log("Error fetching Prismic menu:", err)
            })
    }, [])

    if (!navData) {
        return <p className="nav-status">'Loading...'</p>
    }

    console.log(navData)

    return (
        <nav className="site-navigation">
            <div className="nav-logo">
                <PrismicText field={navData.company_name} />
            </div>
            <ul className="nav-links">
                {navData.menu_items.map((item, index) => {
                    const link = item.menu_link;
                    let path;

                    if (link.type === 'homepage') {
                        path = '/';
                    } else if (link.type === 'blog_post') {
                        path = `/blog/${link.uid}`;
                    } else if (link.type === 'contact_form') {
                        path = '/contact';
                    } else {
                        return null;
                    }

                    return (
                        <li key={index}>
                            <Link to={path}>{item.menu_label}</Link>
                        </li>
                    );
                })}
                {/* {navData.menu_items.map((item, index) => (
                    <li key={index}>
                        <Link to="/">
                            {item.menu_label}
                        </Link>
                    </li>

                ))} */}
            </ul>
        </nav>
    )
}

export default Nav;

