export default [
    {
        path: '/list/equipment',
        name: 'List / Equipment',
        component: () => import('@/views/pages/administration/admin/equipment'),
        meta:
        {
            name: 'Equipment',
            page: 'list',
        },
    },
    {
        path: '/list/borrow',
        name: 'List / Borrow',
        component: () => import('@/views/pages/administration/admin/borrow'),
        meta:
        {
            name: 'Borrow',
            page: 'list',
        },
    },
    {
        path: '/list/account',
        name: 'List / Account',
        component: () => import('@/views/pages/administration/admin/account'),
        meta:
        {
            name: 'Account',
            page: 'list',
        },
    },
];