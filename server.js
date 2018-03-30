// server.js
const express = require('express');
const path = require('path');
// const Root = require('./src/component/app').default;
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const layout = require('./src/layout/layout');
const serverRender = require('./dist/server').default;

console.log('severRender: ',serverRender)


const server = express();

server.use(express.static('dist'));

server.get('/', (request, response) => {
    // 将请求的url传递给路由
    const Root = serverRender({location: request.url});

    const rootHtml = ReactDOMServer.renderToString(
        // React.createElement(Root)
        Root
    );

    const html = layout(rootHtml, '/client.js');
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
