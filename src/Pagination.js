import React from 'react';
import { Route, Link, useParams } from 'react-router-dom/cjs/react-router-dom.min';

const Pagination = props => {
    const { children, path, limit = 1 } = props;
    const length = children.length;
    const { page } = useParams();
    // const page = 1
    const begin = limit * (page - 1);
    const end = page * limit;

    const pages = Math.ceil(length / limit)
    const links = (new Array(pages).fill(0)).map((item, index) =>
        <li key={index}>
            <Link to={`${path}/${index + 1}`}>{index + 1}</Link>
        </li>)

    return (
        <>
            <Route path={`${path}/:page`}>
                {children.slice(begin, end)}
                <nav>
                    <ul>{links}</ul>
                </nav>
            </Route>
        </>
    );
}
export default Pagination;