import React from 'react';
import {Route, Link} from 'react-router-dom';
import App from 'component/app';
import About from 'component/about';

const Home = () => (
    <div>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
        </ul>

    <hr/>

        <Route exact path="/" component={App}/>
        <Route path="/about" component={About}/>
    </div>
)

export default Home;
