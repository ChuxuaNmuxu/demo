import React from 'react';
import ReactDom from 'react-dom';
import App from 'component/Board';
import {observe} from '../component/Game'

const root = document.getElementById('root');
observe(
    knightPosition => ReactDom.render(<App knightPosition={knightPosition} />, root)
)
