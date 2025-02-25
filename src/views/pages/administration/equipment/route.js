export default [
    {
        path: '/administration/equipment',
        name: 'Administration / Equipment',
        component: () => import('@/views/pages/administration/equipment'),
        meta:
        {
            name: 'Equipment',
            page: 'list',
        },
        children:
            [
                {
                    path: 'create',
                    name: 'Create Administration / Equipment',
                    component: () => import('@/views/pages/administration/equipment'),
                    meta:
                    {
                        name: 'Create Equipment',
                        page: 'create',
                        subPage: 'main',
                    },
                },
                {
                    path: 'view',
                    name: 'View Administration / Equipment',
                    component: () => import('@/views/pages/administration/equipment'),
                    meta:
                    {
                        name: 'View Equipment',

                        page: 'view',
                    },
                    children:
                        [
                            {
                                path: 'edit',
                                name: 'Edit Administration / Equipment',
                                component: () => import('@/views/pages/administration/equipment'),
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