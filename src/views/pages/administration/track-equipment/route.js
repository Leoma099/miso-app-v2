export default [
    {
        path: '/administration/track-equipment',
        name: 'Administration / Track Equipment',
        component: () => import('@/views/pages/administration/track-equipment'),
        meta:
        {
            name: 'User Accounts',
            page: 'list',
        },
        children:
            [
                {
                    path: 'create',
                    name: 'Create Administration / Track Equipment',
                    component: () => import('@/views/pages/administration/track-equipment'),
                    meta:
                    {
                        name: 'Create Track Equipment',
                        page: 'create',
                        subPage: 'main',
                    },
                },
                {
                    path: ':id',
                    name: 'View Administration / Track Equipment',
                    component: () => import('@/views/pages/administration/track-equipment'),
                    meta:
                    {
                        name: 'View Track Equipment',
                        page: 'view',
                    },
                    children:
                        [
                            {
                                path: 'edit',
                                name: 'Edit Administration / Track Equipment',
                                component: () => import('@/views/pages/administration/track-equipment'),
                                meta:
                                {
                                    name: 'Edit Track Equipment',

                                    page: 'edit',
                                    subPage: 'main',
                                },
                            },
                        ],
                },
            ],
    },
];