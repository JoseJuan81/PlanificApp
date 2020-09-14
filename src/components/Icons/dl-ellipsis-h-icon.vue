<template>
<!-- https://fontawesome.com/license -->
  <svg viewBox="0 0 512 512" :fill="color" style="width:100%;height:100%">>
    <path :d="d"></path>
</svg>
</template>
<script>
export default {
  name: 'dl-ellipsis-h-icon',
  data() {
    return {
      d: 'M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z',
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
