<template>
  <div>
    <div
      :class="[
        'bg-$white flex p-3 mb-2 rounded-lg shadow',
        { 'flex-col': !isNotEmptyList }
      ]">
      <div class="flex" v-if="isNotEmptyList">
        <button
          type="button"
          :class="[
            'btn btn-icon h-16 w-16 mr-4',
            { 'border border-solid border-primary-base': !flagTree },
          ]"
          @click="flagTree = false"
        >
          <taskListIcon class="text-primary-base" />
        </button>
        <button
          type="button"
          :class="[
            'btn btn-icon h-16 w-16 mr-4',
            { 'border border-solid border-primary-base': flagTree },
          ]"
          @click="flagTree = true"
        >
          <treeTaskIcon class="text-primary-base" />
        </button>
      </div>
      <div :class="{ 'self-end': !isNotEmptyList }">
        <button
          data-cy="new-task"
          class="btn btn-primary"
          @click="newTask"
        >+ Nueva</button>
      </div>
    </div>
    <tree-nodes-dl
      data-cy="treeNodes"
      class="tree-container"
      children="inner"
      text="title"
      :indent="indentComputed"
      :nodes="list"
      v-slot="{ node, isOpen }"
    >
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
        <button
          data-cy="treeNodeActionBtn"
          type="button"
          class="text-gray-base"
          @click.stop
        >click me!</button>
      </div>
    </tree-nodes-dl>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import treeNodesDl from 'tree-nodes-dl';
import taskListIcon from '@/components/Icons/dl-task-list-icon.vue';
import treeTaskIcon from '@/components/Icons/dl-tree-tasks-icon.vue';

function indentComputed() {
  return this.flagTree ? 10 : 0;
}

function newTask() {
  this.$router.push({ name: 'new-hierarchy-task' });
}

function data() {
  return {
    flagTree: true,
  };
}

export default {
  name: 'TreeList',
  components: {
    treeNodesDl,
    taskListIcon,
    treeTaskIcon,
  },
  computed: {
    ...mapState('HierarchyTask', {
      isNotEmptyList: (state) => state.list.length > 0,
      list: (state) => state.list,
    }),
    indentComputed,
  },
  data,
  methods: {
    newTask,
  },
};
</script>
<style lang="scss">
.collapsing-enter-active {
  overflow: hidden;
  animation: bounce-in 1.5s ease-in-out;
}
.collapsing-leave-active {
  overflow: hidden;
  animation: bounce-in .8s ease-in-out reverse;
}
@keyframes bounce-in {
  0% {
    max-height: 0px;
  }
  100% {
    max-height: 2000px;
  }
}

.header-options-task {
  @apply flex justify-between items-center;
}

.header-options-task-none {
  @apply p-3 mb-2;
  @apply flex flex-col self-end;
}

.tree-container {
  @apply bg-$white;
  @apply rounded-xl;

  .node-container-wrapper {

    .slot-node-content {
      @apply border-t border-solid border-gray-light;
      @apply duration-100;
      @apply pr-3 py-2;

      &:hover {
        @apply bg-$white;
        @apply rounded-xl;
        @apply shadow-lg;
        @apply transform scale-x-105;
      }
    }
  }

  .task-node-container {
    @apply cursor-pointer;
    @apply flex items-center;
  }
}

</style>
