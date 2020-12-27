<template>
  <svg viewBox="0 0 448 512" :fill="color" style="width:100%;height:100%">
    <g>
      <path
        :d="d"
      ></path>
    </g>
  </svg>
</template>
<script>
export default {
  name: 'dl-motocycle-icon',
  data() {
    return {
      d: 'M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z',
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
