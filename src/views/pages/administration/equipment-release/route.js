export default [
    {
        path: '/administration/equipment-release',
        name: 'Administration / Equipment Release',
        component: () => import('@/views/pages/administration/equipment-release'),
        meta:
        {
            name: 'Equipment Release',
            page: 'list',
        },
        children:
            [
                {
                    path: 'create',
                    name: 'Create Administration / Equipment Release',
                    component: () => import('@/views/pages/administration/equipment-release'),
                    meta:
                    {
                        name: 'Create Equipment Release',
                        page: 'create',
                        subPage: 'main',
                    },
                },
                {
                    path: ':id',
                    name: 'View Administration / Equipment Release',
                    component: () => import('@/views/pages/administration/equipment-release'),
                    meta:
                    {
                        name: 'View Equipment Release',
                        page: 'view',
                    },
                    children:
                        [
                            {
                                path: 'edit',
                                name: 'Edit Administration / Equipment Release',
                                component: () => import('@/views/pages/administration/equipment-release'),
                                meta:
                                {
                                    name: 'Edit Equipment Release',

                                    page: 'edit',
                                    subPage: 'main',
                                },
                            },
                        ],
                },
            ],
    },
];