export default [
    // MANAGEMENT EQUIPMENT
    {
        path: '/management/equipment',
        name: 'Management / Equipment',
        component: () => import('@/views/pages/administration/management/equipment'),
        meta:
        {
            name: 'Equipment',
            page: 'list',
        },
        children:
        [
            {
                path: 'create',
                name: 'Create / Account',
                component: () => import('@/views/pages/administration/management/equipment'),
                meta:
                {
                    name: 'Create Account',
                    page: 'create',
                    subPage: 'main',
                }
            }
        ]
    },

    // MANAGEMENT BORROW
    {
        path: '/management/borrow',
        name: 'Management / Borrow',
        component: () => import('@/views/pages/administration/management/borrow'),
        meta:
        {
            name: 'Borrow',
            page: 'list',
        },
    },

    // MANAGEMENT ACCOUNT
    {
        path: '/management/account',
        name: 'Management / Account',
        component: () => import('@/views/pages/administration/management/account'),
        meta:
        {
            name: 'Account',
            page: 'list',
        },
    },
];