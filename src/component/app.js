import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from './Container';
import Editor from './Editor';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

// class App extends Component {
//     render() {
//         return (
//             <div>
//                 <Container />
//             </div>
//         );
//     }
// }

const App = () => (
    <Router>
        <Switch>
            <Route component={Editor} path='/' exact />
            <Route render={() => <div>not found</div>} path='*' />
        </Switch>
    </Router>
)

// App.propTypes = {

// };

export default App;