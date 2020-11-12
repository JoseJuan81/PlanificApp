<template>
  <svg viewBox="3 2 20 20" :fill="color" style="width:100%;height:100%">
    <g>
      <path
        :d="d"
      >
    </g>
  </svg>
</template>
<script>
export default {
  name: 'dl-edit-icon',
  data() {
    return {
      d: 'M13.66 6.218c.29.292.29.764 0 1.055l-5.005 5.004c-.29.292-.763.292-1.054 0L5.219 9.895c-.292-.291-.292-.763 0-1.055.29-.29.763-.29 1.054 0l1.855 1.855 4.477-4.477c.29-.29.763-.29 1.054 0z',
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
