import React from 'react';
import ReactDOM from 'react-dom';
import Home from '../view/home';
import { BrowserRouter } from 'react-router-dom'

const root = document.getElementById('root');
ReactDOM.hydrate(
    <BrowserRouter>
        <Home />
    </BrowserRouter>,
root);
