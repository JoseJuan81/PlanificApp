<template>
  <div class="flex flex-col justify-start">
    <label for="input-field" class="input-label">{{label}}</label>
    <input
      id="input-field"
      v-bind="$attrs"
      ref="inputField"
      :class="[invisible ? 'invisible-input' : 'input-field']"
      :value="value"
      @input="sendValue"
      @keydown.enter.prevent="pushEnter"
    >
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

function pushEnter(ev) {
  this.$emit('press-enter', ev.target.value);
}

export default {
  name: 'InputField',
  inheritAttrs: false,
  methods: {
    pushEnter,
    sendValue,
  },
  props: {
    label: {
      default: '',
      type: String,
    },
    invisible: {
      default: false,
      type: Boolean,
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
    @apply border border-solid border-primary-light;
    @apply outline-none;
  }

  &[disabled] {
    @apply cursor-not-allowed;
    @apply bg-gray-lightest;
    @apply text-gray-medium;
  }
}

.invisible-input {
  @apply border-none;
  @apply py-2 px-4;
  @apply w-full;

  &:focus {
    @apply outline-none;
    @apply border-b border-solid border-primary-light;
  }
}
</style>
