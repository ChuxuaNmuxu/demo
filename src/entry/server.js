import React from 'react';
import {StaticRouter} from 'react-router-dom';
import Home from '../view/home';

/**
 * 服务端静态路由
 * @param {object} config 路由参数 @https://reacttraining.com/react-router/web/api/StaticRouter
 */
const serverAppComstructor = config => (
    <StaticRouter {...config}>
        <Home />
    </StaticRouter>
)

export default serverAppComstructor;
