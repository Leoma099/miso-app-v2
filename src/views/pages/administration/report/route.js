export default [
    {
        path: '/administration/report',

        name: 'Administration / Report',

        component: () => import('@/views/pages/administration/report'),

        meta:
        {
            name: 'Report',
            page: 'list'
        }
    },
];