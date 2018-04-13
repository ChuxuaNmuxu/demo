import App from './page/app';
import About from './page/about';
import FetchData from './page/FetchData';

const routes = [
    {
        path: '/',
        exact: true,
        component: App
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/fetchdata',
        component: FetchData
    }
]

export default routes;
