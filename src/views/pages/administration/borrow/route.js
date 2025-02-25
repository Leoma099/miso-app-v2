export default [
    {
        path: '/administration/borrow',
        name: 'Administration / Borrow',
        component: () => import('@/views/pages/administration/borrow'),
        meta:
        {
            name: 'User Accounts',
            page: 'list',
        },
        children:
            [
                {
                    path: 'create',
                    name: 'Create Administration / Borrow',
                    component: () => import('@/views/pages/administration/borrow'),
                    meta:
                    {
                        name: 'Create Borrow',
                        page: 'create',
                        subPage: 'main',
                    },
                },
                {
                    path: ':code',
                    name: 'View Administration / Borrow',
                    component: () => import('@/views/pages/administration/borrow'),
                    meta:
                    {
                        name: 'View Borrow',

                        page: 'view',
                    },
                    children:
                        [
                            {
                                path: 'edit',
                                name: 'Edit Administration / Borrow',
                                component: () => import('@/views/pages/administration/borrow'),
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