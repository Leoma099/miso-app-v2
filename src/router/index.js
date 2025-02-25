import { createWebHistory, createRouter } from "vue-router";

import routes from './routes';

export const router = createRouter({
    history: createWebHistory(),
    root: '/',
    routes,
});

router.beforeEach((to, from, next) =>
{
    const hasAccessToken = localStorage.getItem('access_token');
    const notAuthRequired = ['signin'];
    const authRequired = !notAuthRequired.includes(to.meta.page);

    if (authRequired && !hasAccessToken) {
        return next('/signin');
    }

    if (!authRequired && hasAccessToken) {
        return next('/');
    }

    if (to.path === '/') {
        return next('/dashboard');
    }

    return next();
});
