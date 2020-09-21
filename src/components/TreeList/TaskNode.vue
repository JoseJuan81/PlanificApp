<template>
  <div
    :class="[
      'task-node-container', { 'pl-3': !flagTree },
    ]"
    data-cy="treeNodeSlot"
  >
    <div class="flex-auto">
      <div class="task-node-content">
        <div class="flex items-center flex-auto">
          <span class="mr-2" v-if="!isOpen && node.inner && flagTree">+</span>
          <span class="mr-2" v-if="isOpen && node.inner && flagTree">-</span>
          <h2
            :class="[{'lm': !node.inner }, 'text-left hover:text-gray-darkest']"
          >{{node.title}}</h2>
        </div>

        <div
          v-if="node.checkList.length > 0"
          ref="advance"
          class="text-gray-medium flex items-start h-16 basis-10 mx-1"
        ></div>

        <div
          v-if="this.node.expenses.length > 0"
          ref="expenses"
          class="text-gray-medium text-base flex items-start h-16 basis-10 mx-1"
        ></div>
      </div>

      <div class="flex justify-start flex-wrap text-base text-gray-lightest font-bold">
        <span
          class="m-1 rounded bg-gray-base px-1"
          v-for="(label, indexL) in node.labels"
          :key="indexL"
        >{{label}}</span>
      </div>
    </div>

    <div class="flex items-center">
      <button type="button" class="btn-mini-icon" @click.stop="editTask">
        <DlDetailsIcon
          class="fill-gray-base hover:fill-secondary-dark"
        />
      </button>
    </div>
  </div>
</template>
<script>
import DlDetailsIcon from '@/components/Icons/dl-details-icon.vue';
import Donut from '@/components/graphics/Donuts';
import Bars from '@/components/graphics/Bars';
import { reduce } from 'functionallibrary';

function mounted() {
  this.createDonut();
  this.createBars();
}

function editTask() {
  this.$store.dispatch('HierarchyTask/edit', this.node);
}

function createDonut() {
  const el = this.$refs.advance;
  const donut = new Donut(el, this.donutsOptions);
  donut.init('100%', '100%', '-2.5 -10 5 20');
}

function createBars() {
  this.barsOptions.data = this.getTotalExpensesAndBudget;
  const el = this.$refs.expenses;
  const bars = new Bars(el, this.barsOptions);
  bars.init();
}

function getTotalExpensesAndBudget() {
  const sum = (total, expense) => total + expense.amount;
  const expenses = reduce(sum, 0, this.node.expenses);
  return [
    { active: true, title: 'expenses', value: expenses },
    { active: false, title: 'budget', value: this.node.budget },
  ];
}

function data() {
  return {
    barsOptions: {
      activeProp: 'active',
      classActive: 'fill-warning-dark',
      classUnActive: 'fill-gray-light hover:fill-gray-medium',
      data: [],
      margin: {
        top: 10, right: 10, bottom: 10, left: 10,
      },
      widthBarFactor: 25,
      xProp: 'title',
      yProp: 'value',
    },
    donutsOptions: {
      classActive: 'fill-success-dark',
      classUnActive: 'fill-gray-light hover:fill-gray-medium',
      cornerRadius: 1,
      data: this.node.checkList,
      innerRadius: 2,
      outerRadius: 8,
      padAngle: (Math.PI / 65),
      prop: 'done',
      scaleInnerRadius: 3,
      scaleOuterRadius: 1,
    },
  };
}

export default {
  name: 'TaskNode',
  components: {
    DlDetailsIcon,
  },
  computed: {
    getTotalExpensesAndBudget,
  },
  data,
  methods: {
    createBars,
    createDonut,
    editTask,
  },
  mounted,
  props: {
    flagTree: {
      required: true,
      type: Boolean,
    },
    isOpen: {
      required: true,
      type: Boolean,
    },
    node: {
      required: true,
      type: Object,
    },
  },
};
</script>
<style lang="scss" scoped>
.task-node-container {
    @apply cursor-pointer;
    @apply flex items-center;

    .task-node-content {
      @apply flex items-center;
    }
}
</style>
