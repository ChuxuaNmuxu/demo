import React from 'react';
import {Route, Link, Redirect, Switch} from 'react-router-dom';
import routes from '../routes';

const Home = () => (
    <div>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/previte">previte</Link></li>
            <li><Link to="/fetchdata">fetchdata</Link></li>
        </ul>

    <hr/>

        <Switch>
            {
                routes.map(props => <Route {...props} key={props.path}/>)
            }
        </Switch>


        {
            // 使用exact, 否知会一直匹配'/'，导致无限重定向
        }
        {/* <Route path='/' exact render={() => <Redirect  to='/about' />} />
        <Route path='/about' component={About} /> */}
    </div>
)

export default Home;
