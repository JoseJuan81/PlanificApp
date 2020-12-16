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
  },
};
</script>

<style lang="scss" scoped>
.icon-container {
  @apply flex flex-wrap;
}

.icon-card {
  @apply bg-white;
  @apply cursor-pointer;
  @apply border border-solid border-gray-light rounded-xl;
  @apply shadow;
  @apply p-4 pb-8 mb-4 mr-4;
  @apply h-40;
  @apply text-base;
  @apply duration-100;

  flex: 0 1 18%;
  min-width: 10rem;

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
