<template>
  <div class="bg-gray-light min-h-screen">
    <NavBar />
    <div class="container pt-8">
      <UserProfileLayout
        show-right
        :class="['profile', { 'show': $route.name === 'new-hierarchy-task' }]"
        :show="showMovilMenu"
        :break-point="768"
      >
        <template v-slot:asideLeft>
          <div class="aside-container">
            <router-view name="menuLeft" />
          </div>
        </template>
        <template v-slot:main-content>
          <div class="min-w-movil">
            <router-view />
          </div>
        </template>
        <template v-slot:menu-movil>
          <div class="activator movil mb-4">
            <button
              data-cy="closeMovilMenu"
              class="w-full h-full"
              type="button"
              @click="openMovilMenu"
            >
              <BackIcon class="menu-movil-back-btn" />
            </button>
          </div>
          <router-view name="menuLeft" class="px-4" />
        </template>
        <template v-slot:asideRight>
          <div
            :class="['aside-container']">
            <router-view name="menuRight" />
          </div>
        </template>
      </UserProfileLayout>
    </div>
  </div>
</template>
<script>
import UserProfileLayout from 'user-profile-layout';
import BackIcon from '@/components/Icons/dl-backLeft-icon.vue';
import NavBar from '@/components/common/NavigationBar.vue';
import { mutations, store } from '@/global/VueObservable';

function openMovilMenu() {
  mutations.toggleMovilMenu();
}

function showMovilMenu() {
  return store.showMovilMenu;
}

export default {
  name: 'DefaultLayout',
  components: {
    BackIcon,
    NavBar,
    UserProfileLayout,
  },
  computed: {
    showMovilMenu,
  },
  methods: {
    openMovilMenu,
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

  &.movil {
    @apply w-full;
  }

  .menu-movil-back-btn {
    @apply text-primary-base;
  }
}

.dl-layout-main-container.profile {
  .dl-container-layout {
    @apply flex;

    .dl-section-container {
      @apply flex-auto;
      @apply px-4;
    }

    .dl-aside-container-left,
    .dl-aside-container-right {
      @apply h-full;
      @apply bg-$white;
      @apply duration-200;
      @apply rounded shadow;

      flex-basis: 20%;

      .wrapper-menu {
        @apply border border-solid border-gray-medium;
        @apply px-4;
        @apply sticky;
        @apply ml-auto;

        top: 1rem;

        .menu-section-title {
          @apply text-gray-medium;
          @apply uppercase;
        }

        .profile-avatar-section {
          @apply pt-32;
        }
      }
    }

    .dl-aside-container-right {
      flex-basis: 0%;
    }
  }

  .dl-menu-movil {
    @apply bg-white;
    @apply shadow-lg;
  }

  .menu-items {
    @apply w-full;
    @apply pb-4 pt-6;
    @apply rounded;
    @apply text-$text-secon font-bold;
    @apply sticky top-0;

    li {
      @apply my-2 px-3 py-1;
      @apply text-left whitespace-no-wrap;
      @apply duration-200;

      &:hover {
        @apply bg-gray-medium;
      }

      &.active {
        @apply bg-gray-medium;
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
    @apply border-r border-solid border-gray-medium;

    flex-basis: 22%;

    .container-menu-movil {
      .go-back {
        @apply px-6 pt-4;
      }
    }
  }
}

.dl-layout-main-container.show {
  .dl-aside-container-right {
      flex-basis: 27.5% !important;
    }
}
.aside-container {
  @apply sticky;

  top: 7rem;
}
</style>
