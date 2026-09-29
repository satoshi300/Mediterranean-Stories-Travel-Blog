import React from 'react'
import {
    HashRouter as Router,
    Routes,
    Route
} from "react-router";
import BlogPost from './BlogPost';
import Page from './Page'
import Nav from './Nav';
import ContactForm from './ContactForm';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' Component={Page} />
                <Route path='/blog/:uid' Component={BlogPost} />
                <Route path='/nav' Component={Nav} />
                <Route path='/contact' Component={ContactForm} />
            </Routes>
        </Router>
    )
}

export default App;
