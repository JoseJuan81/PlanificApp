<template>
<!-- https://fontawesome.com/license -->
  <svg viewBox="0 0 192 512" :fill="color" style="width:100%;height:100%">>
    <path :d="d"></path>
</svg>
</template>
<script>
export default {
  name: 'dl-ellipsis-v-icon',
  data() {
    return {
      d: 'M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z',
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
