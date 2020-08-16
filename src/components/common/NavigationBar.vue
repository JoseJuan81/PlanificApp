<template>
  <nav data-cy="navBar" class="p-2 px-6 bg-$dark-prim h-24 flex items-center">
    <div class="activator">
      <button
        data-cy="activatorMovilMenu"
        class="w-full h-full"
        type="button"
        @click="closeMovilMenu"
      >
        <MenuIcon class="text-$white" />
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
.activator {
  @apply block;
  @apply p-3;
  @apply w-20 h-20;

  @media (min-width: 769px) {
    @apply hidden;
  }

  .menu-movil-back-btn {
    @apply text-$primary;
  }
}
</style>
