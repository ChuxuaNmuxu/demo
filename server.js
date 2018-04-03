import express from 'express';
import path from 'path';
import React from 'react';
import ReactDOM from 'react-dom/server';
import App from './src/component/App';
const server = express();
const port = process.env.PORT || 3000;

server.use(express.static(path.join(__dirname, 'public')));

server.get('*', (req, res) => {
    const title = 'Sample Application';
    const app = ReactDOM.renderToString(<App />);
    res.send(`<!doctype html>
        <html>
            <head>
                <title>${title}</title>
            </head>
        <body>
            <div id="app">${app}</div>
            <script src="client.js" />
        </body>
        </html>`);
});

server.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}/`);
});