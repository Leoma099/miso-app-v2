export default [
    {
        path: '/administration/calendar',

        name: 'Administration / Calendar',

        component: () => import('@/views/pages/administration/calendar'),

        meta:
        {
            name: 'Calendar',
            page: 'list',
        },

        children:
            [
                {
                    path: 'create',
                    name: 'Create Administration / Calendar',
                    component: () => import('@/views/pages/administration/calendar'),
                    meta:
                    {
                        name: 'Create Calendar',
                        page: 'create',
                        subPage: 'main',
                    },
                },
                {
                    path: ':id',
                    name: 'View Administration / Calendar',
                    component: () => import('@/views/pages/administration/calendar'),
                    meta:
                    {
                        name: 'View Calendar',
                        page: 'view',
                    },
                    children:
                        [
                            {
                                path: 'edit',
                                name: 'Edit Administration / Calendar',
                                component: () => import('@/views/pages/administration/calendar'),
                                meta:
                                {
                                    name: 'Edit Calendar',

                                    page: 'edit',
                                    subPage: 'main',
                                },
                            },
                        ],
                },
            ],
    },
];