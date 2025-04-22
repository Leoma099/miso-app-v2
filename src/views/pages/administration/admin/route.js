export default [
    {
        path: '/equipment/list',
        name: 'List / Equipment',
        component: () => import('@/views/pages/administration/admin/available'),
        meta:
        {
            name: 'Equipment',
            page: 'list',
        },
    },
    {
        path: '/pending/list',
        name: 'List / Pending',
        component: () => import('@/views/pages/administration/admin/pending'),
        meta:
        {
            name: 'Pending',
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
];