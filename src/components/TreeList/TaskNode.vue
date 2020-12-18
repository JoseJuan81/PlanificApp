<template>
  <div
    :class="[
      'task-node-container', { 'pl-3': !flagTree },
    ]"
    data-cy="treeNodeSlot"
  >
    <div class="flex-auto">
      <div class="flex items-center">
        <span
          :class="['subtasks-activator', { 'bg-success-dark': isOpen }]"
          v-if="node.subTasks && node.subTasks.length">
        </span>
        <span v-if="node.parentTask && node.parentTask.id" class="subtask"></span>
        <h2
          :class="[{'lm': !node.inner }, 'node-title']"
        >{{node.name}}</h2>
      </div>
      <div class="flex justify-start flex-wrap text-base text-gray-lightest font-bold">
        <span
          class="m-1 rounded bg-gray-base px-1"
          v-for="(label, indexL) in node.labels"
          :key="indexL"
        >{{label}}</span>
      </div>
    </div>

    <div v-if="existCheckList" class="flex items-end w-20">
      <h4 class="text-gray-medium text-base">{{advanceInPercentage}}%</h4>
      <div
        ref="advance"
        class="text-gray-base flex items-start h-12"
      ></div>
    </div>

    <div
      v-if="existExpenses"
      ref="expenses"
      class="text-gray-medium text-base flex items-start h-12 w-20 mx-1"
    ></div>

    <div class="flex items-center ml-2">
      <button type="button" class="btn-mini-icon" @click.stop="editTask">
        <DlEditIcon
          class="fill-gray-medium hover:fill-primary-darkest"
        />
      </button>
      <button type="button" class="btn-mini-icon">
        <DlEllipsisV class="fill-gray-medium hover:fill-success-dark"/>
      </button>
    </div>
  </div>
</template>
<script>
import DlEditIcon from '@/components/Icons/dl-edit-icon.vue';
import DlEllipsisV from '@/components/Icons/dl-ellipsis-h-icon.vue';
import Donut from '@/components/graphics/Donuts';
import Bars from '@/components/graphics/Bars';
import {
  getPropertysValue,
  isEmpty,
  round,
} from 'functionallibrary';

const noDecimals = round(0);

function mounted() {
  this.loadData();
}

function loadData() {
  if (this.existExpenses) {
    this.createBars();
  }
  if (this.existCheckList) {
    this.createDonut();
  }
}

function editTask() {
  this.$store.dispatch('Task/edit', this.node);
  const id = this.node.id || 1;
  this.$router.push({ name: 'edit-hierarchy-task', params: { id } });
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
  return [
    { active: true, title: 'expenses', value: this.node.spent },
    { active: false, title: 'budget', value: this.node.budget.amount || 5 },
  ];
}

function existExpenses() {
  return !isEmpty(getPropertysValue('expenses', this.node));
}

function existCheckList() {
  return !isEmpty(getPropertysValue('checkList', this.node));
}

function advanceInPercentage() {
  const checkList = getPropertysValue('checkList', this.node);
  const total = checkList.length;
  if (total) {
    const parcial = checkList.reduce((acc, item) => {
      if (item.done) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return noDecimals((parcial / total) * 100);
  }
  return 0;
}

function data() {
  return {
    barsOptions: {
      activeProp: 'active',
      classActive: 'fill-error-medium hover:fill-error-dark',
      classUnActive: 'fill-primary-medium hover:fill-primary-dark',
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
      classUnActive: 'fill-gray-medium hover:fill-gray-base',
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
    DlEditIcon,
    DlEllipsisV,
  },
  computed: {
    advanceInPercentage,
    getTotalExpensesAndBudget,
    existCheckList,
    existExpenses,
  },
  data,
  methods: {
    createBars,
    createDonut,
    editTask,
    loadData,
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
    @apply text-gray-base font-normal;
    @apply relative;

    .node-title {
      @apply text-gray-base text-left font-thin;

    }

    &:hover .node-title {
      @apply font-normal;
    }

    .subtasks-activator {
      @apply bg-gray-medium;
      @apply h-2 w-2;
      @apply rounded-full;
      @apply absolute;

      left: -7.5px;

    }
}
</style>
