<template>
  <div class="flex flex-col justify-start">
    <label for="input-field" class="input-label">{{label}}</label>

    <select
      v-if="itemText && itemValue"
      id="input-field"
      v-bind="$attrs"
      class="input-field"
      :value="value"
      @input="sendValue"
    >
      <option
        v-for="(opt, indexOpt) in options"
        :key="indexOpt"
        :value="opt[itemValue]"
      >{{opt[itemText]}}</option>
    </select>

    <select
      v-else
      id="input-field"
      v-bind="$attrs"
      class="input-field"
      :value="value"
      @input="sendValue"
    >
      <option
        v-for="(opt, indexOpt) in options"
        :key="indexOpt"
        :value="opt"
      >{{opt}}</option>
    </select>

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
  name: 'SelectorField',
  inheritAttrs: false,
  methods: {
    sendValue,
  },
  props: {
    label: {
      default: '',
      type: String,
    },
    options: {
      required: true,
      type: Array,
    },
    validation: {
      default: false,
      type: Boolean,
    },
    itemText: {
      default: '',
      type: String,
    },
    itemValue: {
      default: '',
      type: String,
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
}

</style>
