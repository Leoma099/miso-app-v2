export default [
    {
        path: '/client/dashboard',

        name: 'Client / Dashboard',

        component: () => import('@/views/pages/client/dashboard'),

        meta:
        {
            name: 'Dashboard'
        }
    },
];