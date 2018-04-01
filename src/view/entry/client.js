import React from 'react';
import ReactDOM from 'react-dom';
import Home from '../page/home';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import create from '../../store';

const store = create(window.__INITIAL_STATE__);
// delete window.__INITIAL_STATE__;

const root = document.getElementById('root');
ReactDOM.hydrate(
    <Provider store={store} >
        <BrowserRouter>
            <Home />
        </BrowserRouter>
    </Provider>,
root);
