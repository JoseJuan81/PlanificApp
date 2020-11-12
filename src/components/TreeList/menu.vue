<template>
  <nav data-cy="treeListMovilMenu" class="lateral-nav">
    <ul>
      <li
        v-for="(route, indexR) in routes"
        :key="indexR"
        :class="{ 'selected': $route.fullPath.includes(route.path) }"
        @click="goTo(route)"
      >
        <router-link :to="route.path">{{route.title}}</router-link>
      </li>
    </ul>
  </nav>
</template>
<script>

function goTo({ path }) {
  this.$router.push(path);
}

function data() {
  return {
    routes: [
      { path: 'actividades/lista', title: 'Jerarquía' },
      { path: '/gantt', title: 'Gantt' },
      { path: '/gastos/lista', title: 'Gastos' },
    ],
  };
}

export default {
  name: 'TreeListMenu',
  data,
  methods: {
    goTo,
  },
};
</script>

<style lang="scss" scoped>
.lateral-nav {
  ul {
    @apply text-left text-xl text-gray-base;
    @apply py-2;

    li {
      @apply my-3 mx-2 px-3 py-1;
      @apply tracking-wider;
      @apply rounded;
      @apply cursor-pointer;

      &:hover {
        @apply bg-gray-lightest;
        @apply text-gray-darkest;
      }

      &.selected {
        @apply bg-primary-lightest;
        @apply text-primary-dark;
      }
    }
  }
}
</style>
