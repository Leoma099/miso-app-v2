export default [
    {
        path: '/client/equipment',
        name: 'Client / Equipment',
        component: () => import('@/views/pages/client/equipment'),
        meta:
        {
            name: 'Equipment',
            page: 'list',
        },
        children:
            [
                {
                    path: 'create',
                    name: 'Create Client / Equipment',
                    component: () => import('@/views/pages/client/equipment'),
                    meta:
                    {
                        name: 'Create Equipment',
                        page: 'create',
                        subPage: 'main',
                    },
                },
                {
                    path: 'view',
                    name: 'View Client / Equipment',
                    component: () => import('@/views/pages/client/equipment'),
                    meta:
                    {
                        name: 'View Equipment',

                        page: 'view',
                    },
                    children:
                        [
                            {
                                path: 'edit',
                                name: 'Edit Client / Equipment',
                                component: () => import('@/views/pages/client/equipment'),
                                meta:
                                {
                                    name: 'Edit Equipment',

                                    page: 'edit',
                                    subPage: 'main',
                                },
                            },
                        ],
                },
            ],
    },
];