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
  @apply border border-solid border-gray-dark rounded;
  @apply text-gray-dark font-bold;
  @apply bg-gray-lightest;
  @apply px-2 py-1 m-1;

  .tag-remove {
    @apply w-5 h-5;
    @apply rounded-full;
    @apply leading-none;
    @apply ml-1;

    &:hover {
      @apply bg-gray-dark;
      @apply text-white;
    }
    &:focus {
      @apply outline-none;
    }
  }
}
</style>
