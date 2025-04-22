export default [
    {
        path: '/administration/department',
        name: 'Administration / Department',
        component: () => import('@/views/pages/administration/department'),
        meta:
        {
            name: 'Department',
            page: 'list',
        },
        children:
            [
                {
                    path: 'create',
                    name: 'Create Administration / Department',
                    component: () => import('@/views/pages/administration/department'),
                    meta:
                    {
                        name: 'Create Department',
                        page: 'create',
                        subPage: 'main',
                    },
                },
                {
                    path: ':id',
                    name: 'View Administration / Department',
                    component: () => import('@/views/pages/administration/department'),
                    meta:
                    {
                        name: 'View Department',

                        page: 'view',
                    },
                    children:
                        [
                            {
                                path: 'edit',
                                name: 'Edit Administration / Department',
                                component: () => import('@/views/pages/administration/department'),
                                meta:
                                {
                                    name: 'Edit Department',

                                    page: 'edit',
                                    subPage: 'main',
                                },
                            },
                        ],
                },
            ],
    },
];