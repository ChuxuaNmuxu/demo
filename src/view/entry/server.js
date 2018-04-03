import React from 'react';
import {StaticRouter} from 'react-router-dom';
import Home from '../page/home';
import routes from '../routes';
import {matchPath} from 'react-router-dom';
import {Provider} from 'react-redux';
import create from '../../store';
import initialState from 'src/initialState';

/**
 * 服务端静态路由
 * @param {object} config 路由参数 @https://reacttraining.com/react-router/web/api/StaticRouter
 */
const serverAppConstructor = config => {
    // load data
    // matchPath 相当于渲染之外的route,可以匹配路由，参数和route一致，（route是组件，所以只能在渲染的时候去匹配）,可以用来预加载数据等
    // matchPath 第二个参数与第一个参数竞争匹配（好像是更严格的限制条件）
    const {location} = config;
    const promises = [];
    routes.some(route => {
        const match = matchPath(location, route);
        if (match) {
            const fetchData = route.loadData ? route.loadData(match) : Promise.resolve('');
            promises.push(fetchData)   
        }
    })
    
    // 服务器端路由只需要接受客户端请求的地址，而不需要监听浏览器location的变化，所以使用静态路由
    // BroserRouter会接受浏览器的api（history，dom...），用在服务端会报错
    return Promise.all(promises).then(data => {
        // initialState logic
        const preloadedState = data.reduce((accu, value) => Object.assign(accu, value),  Object.assign({}, initialState));

        // store of redux
        const store = create(preloadedState);

        return {
            Root: <Provider store={store} >
            <StaticRouter {...config} >
                <Home />
            </StaticRouter>
        </Provider>,
        preloadedState
        }
    })
}

export default serverAppConstructor;