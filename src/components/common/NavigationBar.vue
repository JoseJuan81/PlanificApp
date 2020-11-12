<template>
  <nav data-cy="navBar" class="header-nav">
    <div class="activator">
      <button
        data-cy="activatorMovilMenu"
        class="w-full h-full"
        type="button"
        @click="closeMovilMenu"
      >
        <MenuIcon class="text-primary-base" />
      </button>
    </div>
  </nav>
</template>
<script>
import MenuIcon from '@/components/Icons/dl-hamburguer-icon.vue';
import { mutations } from '@/global/VueObservable';

function closeMovilMenu() {
  mutations.toggleMovilMenu();
}

function data() {
  return {
    show: false,
  };
}

export default {
  name: 'NavigationBar',
  components: {
    MenuIcon,
  },
  data,
  methods: {
    closeMovilMenu,
  },
};
</script>
<style lang="scss">
.header-nav {
  @apply p-2 px-6;
  @apply shadow;
  @apply bg-$white;
  @apply h-24;
  @apply flex items-center;
  @apply sticky top-0 z-10;
}
.activator {
  @apply block;
  @apply p-3;
  @apply w-16 h-16;

  @media (min-width: 769px) {
    @apply hidden;
  }

  .menu-movil-back-btn {
    @apply text-primary-base;
  }
}
</style>
