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
        menuLeft: () => import('@/components/common/Menu.vue'),
        menuRight: () => import('@/components/TreeList/TaskDetails.vue'),
      },
      children: [
        {
          name: 'new-hierarchy-task',
          path: 'nueva',
          component: () => import('@/components/TreeList/NewTaskForm.vue'),
        },
        {
          name: 'edit-hierarchy-task',
          path: 'editar/:id',
          component: () => import('@/components/TreeList/NewTaskForm.vue'),
        },
      ],
    },
  ],
};
export default treeListRoute;
