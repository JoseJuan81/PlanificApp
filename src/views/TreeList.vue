<template>
  <div>
    <div
      :class="[
        'bg-$white flex justify-end p-3 mb-2 rounded-lg shadow',
      ]">
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
      children="subTasks"
      text="title"
      :indent="indentComputed"
      :nodes="hierarchyList"
      v-slot="{ node, isOpen }"
    >
      <TaskNode :node="node" :is-open="isOpen" :flag-tree="flagTree" />
    </tree-nodes-dl>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import treeNodesDl from 'tree-nodes-dl';
import TaskNode from '@/components/TreeList/TaskNode.vue';

function created() {
  this.$store.dispatch('Task/hierarchy');
}

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
    TaskNode,
    treeNodesDl,
  },
  computed: {
    ...mapState('Task', {
      isNotEmptyList: (state) => state.hierarchy.length > 0,
      hierarchyList: (state) => state.hierarchy,
    }),
    indentComputed,
  },
  created,
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
      @apply duration-75;
      @apply pr-3 py-2;

      &:hover {
        @apply bg-$white;
        @apply rounded-xl;
        @apply shadow-lg;

        transform: scaleX(1.015);
      }
    }
  }
}

</style>
