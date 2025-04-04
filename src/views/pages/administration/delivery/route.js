export default [
    {
        path: '/administration/delivery',
        name: 'Administration / Delivery',
        component: () => import('@/views/pages/administration/delivery'),
        meta:
        {
            name: 'Delivery',
            page: 'list',
        },
        children:
            [
                {
                    path: 'create',
                    name: 'Create Administration / Delivery',
                    component: () => import('@/views/pages/administration/delivery'),
                    meta:
                    {
                        name: 'Create Delivery',
                        page: 'create',
                        subPage: 'main',
                    },
                },
                {
                    path: ':id',
                    name: 'View Administration / Delivery',
                    component: () => import('@/views/pages/administration/delivery'),
                    meta:
                    {
                        name: 'View Delivery',
                        page: 'view',
                    },
                    children:
                        [
                            {
                                path: 'edit',
                                name: 'Edit Administration / Delivery',
                                component: () => import('@/views/pages/administration/delivery'),
                                meta:
                                {
                                    name: 'Edit Delivery',

                                    page: 'edit',
                                    subPage: 'main',
                                },
                            },
                        ],
                },
            ],
    },
];