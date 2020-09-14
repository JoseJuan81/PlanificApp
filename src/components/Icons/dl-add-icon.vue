<template>
<!-- https://fontawesome.com/license -->
  <svg viewBox="0 0 448 512" :fill="color" style="width:100%;height:100%">>
    <path :d="d"></path>
</svg>
</template>
<script>
export default {
  name: 'dl-add-icon',
  data() {
    return {
      d: 'M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z',
    };
  },
  props: {
    color: {
      default: 'currentColor',
      type: String,
    },
  },
};
</script>
<style lang="scss" scoped>

</style>
