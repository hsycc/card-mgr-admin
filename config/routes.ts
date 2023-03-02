export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { path: '/user', routes: [{ path: '/user/login', component: './User/Login' }] },
      { component: './404' },
    ],
  },
  { path: '/point', icon: 'table', name: '码点管理', component: './Point' },
  { path: '/batch', icon: 'table', name: '批次管理', component: './Batch' },
  { path: '/account', icon: 'table', name: '用户管理', component: './Account', access: 'canAdmin' },
  { path: '/', redirect: '/point' },
  { component: './404' },
];
