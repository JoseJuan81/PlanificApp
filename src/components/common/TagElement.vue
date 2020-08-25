<template>
  <span class="tag">
    <span>{{content}}</span>
    <button
      type="button"
      class="tag-remove"
      @click="$emit('click')"
    >&times;</button>
  </span>
</template>
<script>
export default {
  name: 'TagElement',
  props: {
    content: {
      type: String,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.tag {
  @apply border border-solid border-primary-base rounded;
  @apply text-primary-base font-bold;
  @apply bg-primary-base bg-opacity-25 ;
  @apply px-2 py-1 m-1;

  .tag-remove {
    @apply w-5 h-5;
    @apply rounded-full;
    @apply leading-none;
    @apply ml-1;

    &:hover {
      @apply bg-primary-base;
      @apply text-white;
    }
    &:focus {
      @apply outline-none;
    }
  }
}
</style>
