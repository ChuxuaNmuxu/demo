import React from 'react';
import {Route, Link, Redirect} from 'react-router-dom';
import App from './app';
import About from './about';
import routes from './routes';

const Home = () => (
    <div>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/previte">previte</Link></li>
        </ul>

    <hr/>

        {/* {
            routes.map(({component, path}) => <Route component={component} path={path} key={path}/>)
        } */}

        <Route path='/' exact render={() => <Redirect  to='/about' />} />
        <Route path='/about' component={About} />
    </div>
)

export default Home;
