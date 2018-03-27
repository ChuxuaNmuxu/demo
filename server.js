// server.js
const express = require('express');
const path = require('path');
// const Root = require('./src/component/app').default;
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const loyout = require('./src/layout/layout');
const Root = require('./dist/server.js').default;

const server = express();

server.use(express.static('dist'));

server.get('/', (request, response) => {
    const rootHtml = ReactDOMServer.renderToString(
        React.createElement(Root)
    );

    const html = layout(rootHtml, path.resolve(__dirname, 'dist/client.js'));
    response.send(html);
});

// 服务器端口
const port = 3001;

server.listen(port, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.info(`Server running on http://localhost:${port}/`);
});
