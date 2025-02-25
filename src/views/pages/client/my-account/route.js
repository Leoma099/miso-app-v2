export default [
    {
        path: '/client/my-account',

        name: 'Client / My-Account',

        component: () => import('@/views/pages/client/my-account'),

        meta:
        {
            name: 'My-Account'
        }
    },
];