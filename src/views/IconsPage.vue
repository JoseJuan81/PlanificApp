<template>
    <div class="icon-container">
        <div class="icon-card">
          <AddIcon />
          <small class="icon-name">dl-add-icon</small>
        </div>
        <div class="icon-card">
          <BackLeft />
          <small class="icon-name">dl-backLeft-icon</small>
        </div>
        <div class="icon-card">
          <BillingIcon />
          <small class="icon-name">dl-billing-icon</small>
        </div>
        <div class="icon-card">
          <CargoCart />
          <small class="icon-name">dl-cargoCart-icon</small>
        </div>
        <div class="icon-card">
          <CheckIcon />
          <small class="icon-name">dl-check-icon</small>
        </div>
        <div class="icon-card">
          <CloseIcon />
          <small class="icon-name">dl-close-icon</small>
        </div>
        <div class="icon-card">
          <Delivered />
          <small class="icon-name">dl-delivered-icon</small>
        </div>
        <div class="icon-card">
          <Details />
          <small class="icon-name">dl-details-icon</small>
        </div>
        <div class="icon-card">
          <Edit />
          <small class="icon-name">dl-edit-icon</small>
        </div>
        <div class="icon-card">
          <EllipsisH />
          <small class="icon-name">dl-ellipsis-h-icon</small>
        </div>
        <div class="icon-card">
          <EllipsisV />
          <small class="icon-name">dl-ellipsis-v-icon</small>
        </div>
        <div class="icon-card">
          <FileUpload />
          <small class="icon-name">dl-file-upload-icon</small>
        </div>
        <div class="icon-card">
          <Hamburger />
          <small class="icon-name">dl-hamburger-icon</small>
        </div>
        <div class="icon-card">
          <Heart />
          <small class="icon-name">dl-heart-icon</small>
        </div>
        <div class="icon-card">
          <LockIcon />
          <small class="icon-name">dl-lock-icon</small>
        </div>
        <div class="icon-card">
          <LockOpen />
          <small class="icon-name">dl-lock-open-icon</small>
        </div>
        <div class="icon-card">
          <Motocycle />
          <small class="icon-name">dl-motocycle-icon</small>
        </div>
        <div class="icon-card">
          <PayIcon />
          <small class="icon-name">dl-pay-icon</small>
        </div>
        <div class="icon-card">
          <TaskList />
          <small class="icon-name">dl-task-list-icon</small>
        </div>
        <div class="icon-card">
          <TreeTask />
          <small class="icon-name">dl-tree-tasks-icon</small>
        </div>
    </div>
</template>

<script>
import AddIcon from '@/components/Icons/dl-add-icon.vue';
import BackLeft from '@/components/Icons/dl-backLeft-icon.vue';
import BillingIcon from '@/components/Icons/dl-billing-icon.vue';
import CargoCart from '@/components/Icons/dl-cargoCart-icon.vue';
import CheckIcon from '@/components/Icons/dl-check-icon.vue';
import CloseIcon from '@/components/Icons/dl-close-icon.vue';
import Delivered from '@/components/Icons/dl-delivered-icon.vue';
import Details from '@/components/Icons/dl-details-icon.vue';
import Edit from '@/components/Icons/dl-edit-icon.vue';
import EllipsisH from '@/components/Icons/dl-ellipsis-h-icon.vue';
import EllipsisV from '@/components/Icons/dl-ellipsis-v-icon.vue';
import FileUpload from '@/components/Icons/dl-file-upload-icon.vue';
import Hamburger from '@/components/Icons/dl-hamburguer-icon.vue';
import Heart from '@/components/Icons/dl-heart-icon.vue';
import LockIcon from '@/components/Icons/dl-lock-icon.vue';
import LockOpen from '@/components/Icons/dl-lock-open-icon.vue';
import Motocycle from '@/components/Icons/dl-motocycle-icon.vue';
import PayIcon from '@/components/Icons/dl-pay-icon.vue';
import TaskList from '@/components/Icons/dl-task-list-icon.vue';
import TreeTask from '@/components/Icons/dl-tree-tasks-icon.vue';

export default {
  name: 'IconPage',
  components: {
    AddIcon,
    BackLeft,
    BillingIcon,
    CargoCart,
    CheckIcon,
    CloseIcon,
    Delivered,
    Details,
    Edit,
    EllipsisH,
    EllipsisV,
    FileUpload,
    Hamburger,
    Heart,
    LockIcon,
    LockOpen,
    Motocycle,
    PayIcon,
    TaskList,
    TreeTask,
  },
};
</script>

<style lang="scss" scoped>
.icon-container {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(9.5rem, 1fr));
}

.icon-card {
  @apply bg-white;
  @apply cursor-pointer;
  @apply border border-solid border-gray-light rounded-xl;
  @apply shadow;
  @apply p-4 pb-8;
  @apply h-24;
  @apply text-base;
  @apply duration-100;

  &:hover {
    @apply shadow-xl;

    .icon-name {
      @apply text-success-base;
      @apply font-bold;
    }
  }

  .icon-name {
    @apply text-gray-medium;
  }
}

</style>
