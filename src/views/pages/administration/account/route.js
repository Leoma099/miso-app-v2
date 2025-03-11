export default [
    {
        path: '/administration/account',
        name: 'Administration / User Account',
        component: () => import('@/views/pages/administration/account'),
        meta:
        {
            name: 'User Accounts',
            page: 'list',
        },
        children:
            [
                {
                    path: 'create',
                    name: 'Create Administration / User Account',
                    component: () => import('@/views/pages/administration/account'),
                    meta:
                    {
                        name: 'Create User Account',
                        page: 'create',
                        subPage: 'main',
                    },
                },
                {
                    path: ':id',
                    name: 'View Administration / User Account',
                    component: () => import('@/views/pages/administration/account'),
                    meta:
                    {
                        name: 'View User Account',

                        page: 'view',
                    },
                    children:
                        [
                            {
                                path: 'edit',
                                name: 'Edit Administration / User Account',
                                component: () => import('@/views/pages/administration/account'),
                                meta:
                                {
                                    name: 'Edit User Account',

                                    page: 'edit',
                                    subPage: 'main',
                                },
                            },
                        ],
                },
            ],
    },
];