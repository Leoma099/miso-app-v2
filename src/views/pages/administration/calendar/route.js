export default [
    {
        path: '/administration/calendar',

        name: 'Administration / Calendar',

        component: () => import('@/views/pages/administration/calendar'),

        meta:
        {
            name: 'Calendar',
            page: 'list',
        }
    },
];