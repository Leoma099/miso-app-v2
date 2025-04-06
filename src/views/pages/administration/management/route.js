export default [
    // MANAGEMENT EQUIPMENT
    {
        path: '/management/equipment',
        name: 'Management / Equipment',
        component: () => import('@/views/pages/administration/management/equipment'),
        meta:
        {
            name: 'Equipment',
            page: 'list',
        },
        children:
        [
            {
                path: 'create',
                name: 'Create / Equipment',
                component: () => import('@/views/pages/administration/management/equipment'),
                meta:
                {
                    name: 'Create Equipment',
                    page: 'create',
                    subPage: 'main',
                }
            },
            {
                path: ':id',
                name: 'View / Equipment',
                component: () => import('@/views/pages/administration/management/equipment'),
                meta:
                {
                    name: 'View Equipment',

                    page: 'view',
                },
                children:
                    [
                        {
                            path: 'edit',
                            name: 'Edit / Equipment',
                            component: () => import('@/views/pages/administration/management/equipment'),
                            meta:
                            {
                                name: 'Edit Equipment',

                                page: 'edit',
                                subPage: 'main',
                            },
                        },
                    ],
            },
        ]
    },

    // MANAGEMENT BORROW
    {
        path: '/management/borrow',
        name: 'Management / Borrow',
        component: () => import('@/views/pages/administration/management/borrow'),
        meta:
        {
            name: 'Borrow',
            page: 'list',
        },
        children:
            [
                {
                    path: 'create',
                    name: 'Create / Borrow',
                    component: () => import('@/views/pages/administration/management/borrow'),
                    meta:
                    {
                        name: 'Create Borrow',
                        page: 'create',
                        subPage: 'main',
                    },
                },
                {
                    path: ':id',
                    name: 'View/ Borrow',
                    component: () => import('@/views/pages/administration/management/borrow'),
                    meta:
                    {
                        name: 'View Borrow',

                        page: 'view',
                    },
                    children:
                        [
                            {
                                path: 'edit',
                                name: 'Edit / Borrow',
                                component: () => import('@/views/pages/administration/management/borrow'),
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

    // MANAGEMENT ACCOUNT
    {
        path: '/management/account',
        name: 'Management / Account',
        component: () => import('@/views/pages/administration/management/account'),
        meta:
        {
            name: 'Account',
            page: 'list',
        },
        children:
            [
                {
                    path: 'create',
                    name: 'Create / Account',
                    component: () => import('@/views/pages/administration/management/account'),
                    meta:
                    {
                        name: 'Create Account',
                        page: 'create',
                        subPage: 'main',
                    },
                },
                {
                    path: ':id',
                    name: 'View / Account',
                    component: () => import('@/views/pages/administration/management/account'),
                    meta:
                    {
                        name: 'View Account',

                        page: 'view',
                    },
                    children:
                        [
                            {
                                path: 'edit',
                                name: 'Edit / Account',
                                component: () => import('@/views/pages/administration/management/account'),
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