import React from 'react';
import ReactDom from 'react-dom';
import App from 'component/app';

const root = document.getElementById('root');
ReactDom.render(<App />, root);

console.log('module.hot: ', module.hot)

if (module.hot) {
    module.hot.accept('../component/app.js');
}
