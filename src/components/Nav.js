import React, { useEffect, useState } from 'react';
import { PrismicText } from '@prismicio/react';
import { client } from '../prismic'
import { Link } from 'react-router';

import '../style/Nav.css';

const Nav = () => {
    const [navData, setNavData] = useState(null)

    useEffect(() => {
        client
            .getSingle('global_nav')
            .then((resp) => {
                setNavData(resp.data)
            })
            .catch((err) => {
            })
    }, [])

    if (!navData) {
        return <p className="nav-status">'Loading...'</p>
    }

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
                    } else {
                        return null;
                    }

                    return (
                        <li key={index}>
                            <Link to={path}>{item.menu_label}</Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    )
}

export default Nav;

