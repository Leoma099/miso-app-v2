export default [
    {
        path: '/equipment/list',
        name: 'List / Equipment',
        component: () => import('@/views/pages/administration/admin/equipment'),
        meta:
        {
            name: 'Equipment',
            page: 'list',
        },
    },
    {
        path: '/borrow/list',
        name: 'List / Borrow',
        component: () => import('@/views/pages/administration/admin/borrow'),
        meta:
        {
            name: 'Borrow',
            page: 'list',
        },
    },
    {
        path: '/account/list',
        name: 'List / Account',
        component: () => import('@/views/pages/administration/admin/account'),
        meta:
        {
            name: 'Account',
            page: 'list',
        },
    },
    {
        path: '/available-equipment/list',
        name: 'List / Available Equipment',
        component: () => import('@/views/pages/administration/admin/available-equipment'),
        meta:
        {
            name: 'Available Equipment',
            page: 'list',
        },
    },
];