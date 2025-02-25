export default [
    {
        path: '/administration/my-account',

        name: 'Administration / My-Account',

        component: () => import('@/views/pages/administration/my-account'),

        meta:
        {
            name: 'My-Account'
        }
    },
];