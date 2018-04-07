// server.js
const express = require('express');
const path = require('path');
// const Root = require('./src/component/app').default;
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const layout = require('./src/view/layout/layout');
const serverRender = require('./build/server').default;

const server = express();
server.use(express.static('build'));

server.get('*', (request, response) => {
    // 将请求的url传递给路由
    const context = {};
    console.log('request.url: ', request.url)
    serverRender({
        location: request.url,
        context
    })
    .then(({Root, preloadedState: initialState}) => {
        const rootHtml = ReactDOMServer.renderToString(
            // React.createElement(Root)
            Root
        );

        const html = layout({
            html: rootHtml,
            path: 'client.js',
            initialState
        });

        if (context.url) {
            response.redirect(context.url);
        } else {
            response.send(html);
        }
    })
});

server.use('/api', require('./api/test.js'));

// 服务器端口
const port = 3099;

server.listen(port, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.info(`Server running on http://localhost:${port}/`);
});
