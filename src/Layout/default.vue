<template>
  <div>
    <nav>Barra de navegación</nav>
    <div class="container">
      <UserProfileLayout
        class="profile"
        :show="show"
        :break-point="768"
      >
        <template v-slot:asideLeft>
          <div class="max-w-sm ml-auto">
            Izquierda
            <router-view name="menu-left" />
          </div>
        </template>
        <template v-slot:main-content>
          <div class="min-w-movil">Contenido web</div>
        </template>
        <template v-slot:menu-movil>Contenido movil</template>
        <template v-slot:asideRight>
          <div class="max-w-sm mr-auto">
            Derecha
            <router-view name="menu-right" />
          </div>
        </template>
      </UserProfileLayout>
      <router-view />
    </div>
  </div>
</template>
<script>
import UserProfileLayout from 'user-profile-layout';

function data() {
  return {
    show: false,
  };
}

export default {
  name: 'DefaultLayout',
  components: {
    UserProfileLayout,
  },
  data,
};
</script>
<style lang="scss">
.activator {
  @apply block;
  @apply pl-4;

  @media (min-width: 769px) {
    @apply hidden;
  }
}

.dl-layout-main-container.profile {
  .dl-container-layout {
    @apply grid grid-flow-col gap-4;

    .dl-aside-container {
      @apply h-full;

      .wrapper-menu {
        @apply border border-solid border-$secondaryGray;
        @apply px-4;
        @apply sticky;
        @apply ml-auto;

        max-width: 15rem;
        top: 1rem;

        .menu-section-title {
          @apply text-$secondaryTextGray;
          @apply uppercase;
        }

        .profile-avatar-section {
          @apply pt-32;
        }
      }
    }
  }

  .dl-menu-movil {
    @apply bg-white;
  }

  .menu-items {
    @apply w-full;
    @apply pb-4 pt-6;
    @apply rounded;
    @apply text-$secondaryTextGray font-bold;
    @apply sticky top-0;

    li {
      @apply my-2 px-3 py-1;
      @apply text-left whitespace-no-wrap;
      @apply duration-200;

      &:hover {
        @apply bg-$secondaryGray;
      }

      &.active {
        @apply bg-$secondaryGray;
        @apply w-full h-full;
        @apply rounded-md;
        @apply duration-500;
      }
    }
  }

  .wrapper-menu-movil {
    @apply h-screen;
    @apply bg-white;
    @apply fixed z-10;
    @apply border-r border-solid border-gray-200;

    flex-basis: 22%;

    .container-menu-movil {
      .go-back {
        @apply px-6 pt-4;
      }
    }
  }
}
</style>
