<template>
  <svg width="100" height="2" viewBox="0 0 100 2" style="width:100%;height:100%">
    <rect
      class="total-rect"
      x="0"
      y="0"
      height="2"
      width="100"
      :fill="backgroundColor"
      :rx="radius"
      :ry="radius"
    />
    <rect
      class="advance-rect"
      x="0"
      y="0"
      height="2"
      :fill="advanceColor"
      :width="advanceComputed"
      :rx="radius"
      :ry="radius"
    />
  </svg>
</template>
<script>
import { round } from 'functionallibrary';

const twoDecimals = round(2);

function advanceComputed() {
  return twoDecimals((this.advance / this.total) * 100);
}
export default {
  name: 'ProgressBar',
  computed: {
    advanceComputed,
  },
  props: {
    advance: {
      type: Number,
      required: true,
    },
    advanceColor: {
      default: '',
      type: String,
    },
    backgroundColor: {
      default: '',
      type: String,
    },
    radius: {
      default: 1,
      type: Number,
    },
    total: {
      type: Number,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>

</style>
