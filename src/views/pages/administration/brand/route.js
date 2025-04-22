export default [
    {
        path: '/administration/brand',
        name: 'Administration / Brand',
        component: () => import('@/views/pages/administration/brand'),
        meta:
        {
            name: 'Brand',
            page: 'list',
        },
        children:
            [
                {
                    path: 'create',
                    name: 'Create Administration / Brand',
                    component: () => import('@/views/pages/administration/brand'),
                    meta:
                    {
                        name: 'Create Brand',
                        page: 'create',
                        subPage: 'main',
                    },
                },
                {
                    path: ':id',
                    name: 'View Administration / Brand',
                    component: () => import('@/views/pages/administration/brand'),
                    meta:
                    {
                        name: 'View Brand',

                        page: 'view',
                    },
                    children:
                        [
                            {
                                path: 'edit',
                                name: 'Edit Administration / Brand',
                                component: () => import('@/views/pages/administration/brand'),
                                meta:
                                {
                                    name: 'Edit Brand',

                                    page: 'edit',
                                    subPage: 'main',
                                },
                            },
                        ],
                },
            ],
    },
];