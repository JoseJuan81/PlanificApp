const treeListRoute = {
  name: 'tasks-list',
  path: '/actividades',
  redirect: '/actividades/lista',
  component: () => import('@/Layout/default.vue'),
  children: [
    {
      name: 'tree-list',
      path: 'lista',
      components: {
        default: () => import(/* webpackChunkName: "tree-list" */ '@/views/TreeList.vue'),
        menuLeft: () => import('@/components/TreeList/menu.vue'),
        menuRight: () => import('@/components/TreeList/detail.vue'),
      },
      children: [
        {
          name: 'new-hierarchy-task',
          path: 'nueva',
          component: () => import('@/components/TreeList/newTask.vue'),
        },
        {
          name: 'edit-hierarchy-task',
          path: 'editar/:id',
          component: () => import('@/components/TreeList/newTask.vue'),
        },
      ],
    },
  ],
};
export default treeListRoute;
