const treeListRoute = {
  name: 'tasks-list',
  path: '/actividades',
  redirect: '/actividades/lista',
  component: () => import('@/Layout/default.vue'),
  children: [
    {
      name: 'tree-list',
      path: 'lista',
      component: () => import(/* webpackChunkName: "tree-list" */ '@/views/TreeList.vue'),
    },
  ],
};
export default treeListRoute;
