export default [
    {
        path: '/client/borrow',
        name: 'Client / Borrow',
        component: () => import('@/views/pages/client/borrow'),
        meta:
        {
            name: 'User Accounts',
            page: 'list',
        },
        children:
            [
                {
                    path: 'create',
                    name: 'Create Client / Borrow',
                    component: () => import('@/views/pages/client/borrow'),
                    meta:
                    {
                        name: 'Create Borrow',
                        page: 'create',
                        subPage: 'main',
                    },
                },
                {
                    path: ':code',
                    name: 'View Client / Borrow',
                    component: () => import('@/views/pages/client/borrow'),
                    meta:
                    {
                        name: 'View Borrow',

                        page: 'view',
                    },
                    children:
                        [
                            {
                                path: 'edit',
                                name: 'Edit Client / Borrow',
                                component: () => import('@/views/pages/client/borrow'),
                                meta:
                                {
                                    name: 'Edit Borrow',

                                    page: 'edit',
                                    subPage: 'main',
                                },
                            },
                        ],
                },
            ],
    },
];