<template>
  <div class="flex flex-col justify-start">
    <label for="text-area-field" class="input-label">{{label}}</label>
    <textarea
      id="text-area-field"
      v-bind="$attrs"
      class="input-field"
      ref="textarea"
      :value="value"
      @input="sendValue"
    ></textarea>
    <div class="error-msg-container" v-if="validation">
      <span class="error-msg">
        <slot></slot>
      </span>
    </div>
  </div>
</template>
<script>

function sendValue(ev) {
  this.$emit('input', ev.target.value);
}

export default {
  name: 'TextAreaField',
  inheritAttrs: false,
  methods: {
    sendValue,
  },
  props: {
    label: {
      default: '',
      type: String,
    },
    validation: {
      default: false,
      type: Boolean,
    },
    value: null,
  },
};
</script>
<style lang="scss" scoped>
.input-label {
  @apply text-left text-lg font-normal;
}

.input-field {
  @apply font-medium;
  @apply bg-white;
  @apply border border-gray-light rounded-lg;
  @apply py-2 px-4;
  @apply w-full;

  &:focus {
    @apply bg-primary-lightest;
    @apply border border-solid border-primary-light;
    @apply outline-none;
  }
}

</style>
