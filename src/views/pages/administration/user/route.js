export default [
    {
        path: '/administration/user',

        name: 'Administration / User',

        component: () => import('@/views/pages/administration/user'),

        meta:
        {
            name: 'User'
        }
    },
];