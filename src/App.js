import React from 'react'
import {
    HashRouter as Router,
    Routes,
    Route
} from "react-router";
import BlogPost from './components/BlogPost';
import Page from './components/Page'
import Nav from './components/Nav';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' Component={Page} />
                <Route path='/blog/:uid' Component={BlogPost} />
                <Route path='/nav' Component={Nav} />
            </Routes>
        </Router>
    )
}

export default App;
