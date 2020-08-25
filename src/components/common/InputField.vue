<template>
  <div class="flex flex-col justify-start">
    <label for="input-field" class="input-label">{{label}}</label>
    <input
      id="input-field"
      v-bind="$attrs"
      class="input-field"
      :value="value"
      @input="sendValue"
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

export default {
  name: 'InputField',
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
  @apply border border-gray-base rounded-lg;
  @apply py-2 px-4;
  @apply w-full;

  &:focus {
    @apply bg-primary-light;
    @apply border border-solid border-primary-base;
    @apply outline-none;
    @apply shadow;
  }
}

.error-msg-container {
  @apply text-left;

  .error-msg {
    @apply text-$error text-lg tracking-wider;
    @apply ml-3;
  }
}
</style>
