const IconsRoute = {
  name: 'icons-page',
  path: '/iconos',
  redirect: '/iconos/lista',
  component: () => import('@/Layout/default.vue'),
  children: [
    {
      name: 'icon-list',
      path: 'lista',
      components: {
        default: () => import(/* webpackChunkName: "icon-list" */ '@/views/IconsPage.vue'),
        menuLeft: () => import('@/components/common/Menu.vue'),
      },
    },
  ],
};
export default IconsRoute;
