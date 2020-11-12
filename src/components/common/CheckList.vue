<template>
  <div>
    <ProgressBar
      class="progress-bar"
      :total="value.length"
      :advance="advance"
    />
    <input
      class="add-item-input"
      type="text"
      ref="checkListTitle"
      :placeholder="placeholder"
      v-model="newItem"
      @keydown.enter="addNewItem"
    >
    <ul>
      <li
        class="check-item"
        v-for="(l, lindex) in value"
        :key="lindex"
      >
        <button type="button" @click="selectItem(lindex)" class="focus:outline-none">
          <slot name="check-item" :item="l"></slot>
          <input type="check" hidden>
        </button>
        <textarea
          type="text"
          :value="l[prop]"
          :class="[
            'text-area',
            'focus:outline-none',
            { 'line-through text-gray-dark': l.done },
          ]"
          @input="updatingItem"
          @keydown.enter="updateItem(lindex)"
        />
        <button type="button" @click="deleteItem(lindex)" class="focus:outline-none">
          <slot name="remove-item"></slot>
        </button>
      </li>
    </ul>
  </div>
</template>
<script>
import { equality, filter } from 'functionallibrary';
import ProgressBar from '@/components/common/ProgressBar.vue';

function addNewItem() {
  const item = {
    done: false,
    [this.prop]: this.newItem,
  };
  this.$emit('input', [].concat(item, this.value));
  this.newItem = '';
}

function deleteItem(index) {
  const copyArray = this.value;
  copyArray.splice(index, 1);
  this.$emit('input', copyArray);
}

function selectItem(index) {
  const [item] = this.value.splice(index, 1);
  item.done = !item.done;
  const copyArray = this.value;
  copyArray.splice(index, 0, item);
  this.$emit('input', copyArray);
}

function updateItem(index) {
  const copyArray = this.value;
  const [oldItem] = copyArray.splice(index, 1);
  oldItem[this.prop] = this.updatedItem;
  copyArray.splice(index, 0, oldItem);
  this.$emit('input', copyArray);
}

function updatingItem(event) {
  this.updatedItem = event.target.value;
}

function advance() {
  const onlyDone = equality('done', true);
  const allDone = filter(onlyDone);
  return allDone(this.value).length;
}

function data() {
  return {
    updatedItem: '',
    newItem: '',
  };
}

export default {
  name: 'CheckList',
  components: {
    ProgressBar,
  },
  computed: {
    advance,
  },
  data,
  methods: {
    addNewItem,
    deleteItem,
    selectItem,
    updateItem,
    updatingItem,
  },
  props: {
    value: {
      default: () => [],
      type: Array,
    },
    placeholder: {
      default: '',
      type: String,
    },
    prop: {
      type: String,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>

</style>
