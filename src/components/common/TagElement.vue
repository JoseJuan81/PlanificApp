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
  @apply border border-solid border-secondary-dark rounded;
  @apply text-$white font-bold;
  @apply bg-secondary-dark;
  @apply px-2 py-1 m-1;

  .tag-remove {
    @apply w-5 h-5;
    @apply rounded-full;
    @apply leading-none;
    @apply ml-1;
    @apply font-bold;

    &:hover {
      @apply bg-$white;
      @apply text-secondary-dark;
    }
    &:focus {
      @apply outline-none;
    }
  }
}
</style>
