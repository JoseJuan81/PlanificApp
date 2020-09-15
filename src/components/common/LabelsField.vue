<template>
  <div class="flex flex-col justify-start">
    <label class="input-label">{{label}}</label>
    <div class="labels-container">
      <Tag
        v-for="(tag, indexTag) in value"
        :key="indexTag"
        :content="tag"
        @click="removeTag(indexTag)"
      />
      <input
        class="input-tag-field"
        v-bind="$attrs"
        @keydown.enter="sendValue"
        v-model="la"
      >
    </div>
    <div class="error-msg-container" v-if="validation">
      <span class="error-msg">
        <slot></slot>
      </span>
    </div>
  </div>
</template>
<script>
import Tag from '@/components/common/TagElement.vue';

function removeTag(index) {
  const updated = this.value;
  updated.splice(index, 1);
  this.$emit('input', updated);
}

function sendValue() {
  const acc = [].concat(this.value, this.la);
  this.$emit('input', acc);
  this.la = '';
}

function data() {
  return {
    la: '',
  };
}

export default {
  name: 'LabelsField',
  inheritAttrs: false,
  components: {
    Tag,
  },
  data,
  methods: {
    removeTag,
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
    value: {
      default: () => [],
      type: Array,
    },
  },
};
</script>
<style lang="scss" scoped>
.input-label {
  @apply text-left text-lg font-normal;
}

.labels-container {
  @apply border border-gray-light rounded-lg;
  @apply p-2;
  @apply w-full;
  @apply flex flex-wrap;

  &:focus-within {
    @apply border border-solid border-primary-light;
    @apply outline-none;
  }

  .input-tag-field {
    @apply bg-transparent;
    @apply flex-1;
    min-width: 1rem;

    &:focus {
      @apply outline-none;
    }
  }

  .error-msg-container {
    @apply text-left;

    .error-msg {
      @apply text-error-dark text-lg tracking-wider;
      @apply ml-3;
    }
  }
}
</style>
