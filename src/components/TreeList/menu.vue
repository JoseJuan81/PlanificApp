<template>
  <nav data-cy="treeListMovilMenu" class="lateral-nav">
    <ul>
      <li>
        <router-link to="/actividades/lista">Listado Jerárquico</router-link>
      </li>
      <li>
        <router-link to="/">Gantt</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'TreeListMenu',
};
</script>

<style lang="scss" scoped>
.lateral-nav {
  ul {
    @apply text-left text-xl;
    @apply pl-8 pr-4;

    li {
      @apply my-3;
      @apply tracking-wider;

      .router-link-exact-active {
        @apply text-primary-base;
      }
    }
  }
}
</style>
