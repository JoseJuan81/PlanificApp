<template>
  <div
    :class="[
      'task-node-container', { 'pl-3': !flagTree },
    ]"
    data-cy="treeNodeSlot"
  >
    <div class="flex items-center flex-auto">
      <span class="mr-2" v-if="!isOpen && node.inner && flagTree">+</span>
      <span class="mr-2" v-if="isOpen && node.inner && flagTree">-</span>
      <h2
        :class="[{'lm': !node.inner }, 'hover:text-gray-darkest']"
      >{{node.title}}</h2>
    </div>
    <div class="mr-4">Checklist</div>
    <div
      :class="[
        'mr-4 text-2xl font-bold text-secondary-darkest',
        { 'text-error-dark': (totalExpense(node.expenses) > node.budget) },
      ]">
      <span>{{totalExpense(node.expenses)}}</span>
      <span class="text-gray-base"> / {{node.budget}}</span>
    </div>
    <button type="button" class="btn-mini-icon" @click.stop>
      <DlDetailsIcon class="fill-gray-base hover:fill-secondary-dark" />
    </button>
  </div>
</template>
<script>
import DlDetailsIcon from '@/components/Icons/dl-details-icon.vue';

function totalExpense(expenses) {
  return expenses.reduce((acc, expense) => acc + expense.amount, 0);
}

export default {
  name: 'TaskNode',
  components: {
    DlDetailsIcon,
  },
  methods: {
    totalExpense,
  },
  props: {
    node: {
      required: true,
      type: Object,
    },
    isOpen: {
      required: true,
      type: Boolean,
    },
  },
};
</script>
<style lang="scss" scoped>
.task-node-container {
    @apply cursor-pointer;
    @apply flex items-center;
  }
</style>
