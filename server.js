// server.js
const express = require('express');
const path = require('path');
// const Root = require('./src/component/app').default;
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const layout = require('./src/view/layout/layout');
const serverRender = require('./build/server').default;
const api = require('./server/api');

const server = express();
server.use(express.static('build'));

const bodyParser = require('body-parser')
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true}))

const router = express.Router();
router.get('/test', api.test)
router.post('/addtest', api.addtest)

server.use('/api', router)

// 匹配api下的路由，路由可以有多个匹配
// server.use('/api', require('./server/test.js'));
// 只能匹配api/test,，没用next，所以不会再匹配 *
// server.get('/api/test', (res, req) => {
//     console.log(2222)
//     req.send({ message: 'Hello from REST API' });
// })

server.get('*', (request, response, next) => {
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

// 服务器端口
const port = 3099;

server.listen(port, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.info(`Server running on http://localhost:${port}/`);
});
