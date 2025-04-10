export default [
    {
        path: '/client/calendar',

        name: 'client / Calendar',

        component: () => import('@/views/pages/client/calendar'),

        meta:
        {
            name: 'Calendar',
            page: 'list',
        },

        children:
            [
                {
                    path: 'create',
                    name: 'Create client / Calendar',
                    component: () => import('@/views/pages/client/calendar'),
                    meta:
                    {
                        name: 'Create Calendar',
                        page: 'create',
                        subPage: 'main',
                    },
                },
                {
                    path: ':id',
                    name: 'View client / Calendar',
                    component: () => import('@/views/pages/client/calendar'),
                    meta:
                    {
                        name: 'View Calendar',
                        page: 'view',
                    },
                    children:
                        [
                            {
                                path: 'edit',
                                name: 'Edit client / Calendar',
                                component: () => import('@/views/pages/client/calendar'),
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