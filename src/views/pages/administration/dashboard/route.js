export default [
    {
        path: '/dashboard',

        name: 'Administration / Dashboard',

        component: () => import('@/views/pages/administration/dashboard'),

        meta:
        {
            name: 'Dashboard'
        }
    },
];