import { lazy } from "react-router-guard";
import { noAuth, auth } from './guards/guards';

export default [
    {
        path: '/logIn',
        canActivate: [noAuth],
        component: lazy(() => import('./containers/Login/Login'))
    },
    {
        path: '/register',
        canActivate: [noAuth],
        component: lazy(() => import('./containers/Register/Register'))
    },
    {
        path: '/events',
        exact: true,
        canActivate: [auth],
        component: lazy(() => import('./containers/Events/Events')),
    },
    {
        path: '/events/create',
        exact: true,
        canActivate: [auth],
        component: lazy(() => import('./containers/Events/EventsCreate')),
    },
    {
        path: '**',
        redirect: '/events'
    }
];