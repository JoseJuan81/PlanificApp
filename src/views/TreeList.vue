<template>
  <div>
    <div class="bg-$white p-3 mb-2 flex justify-between items-center">
      <div class="flex">
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
      <div>
        <button class="btn bg-primary-base text-$white">+ Nueva</button>
      </div>
    </div>
    <tree-nodes-dl
      data-cy="treeNodes"
      class="tree-container"
      children="inner"
      text="title"
      :indent="indentComputed"
      :nodes="treeData"
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
            :class="[{'lm': !node.inner }]"
          >{{node.title}}</h2>
        </div>
        <button
          data-cy="treeNodeActionBtn"
          type="button"
          @click.stop
        >click me!</button>
      </div>
    </tree-nodes-dl>
  </div>
</template>
<script>
import treeNodesDl from 'tree-nodes-dl';
import taskListIcon from '@/components/Icons/dl-task-list-icon.vue';
import treeTaskIcon from '@/components/Icons/dl-tree-tasks-icon.vue';

function indentComputed() {
  return this.flagTree ? 10 : 0;
}

function data() {
  return {
    flagTree: true,
    treeData: [
      {
        title: 'Cambio de Cinta transportadora',
        otherProp: false,
        inner: [
          {
            title: 'Compra de cinta transportadora',
            inner: [
              {
                title: 'Evaluar cotizaciones',
              },
            ],
          },
          {
            title: 'Contratar personal',
            inner: [
              {
                title: 'Perfiles requeridos',
              },
              {
                title: 'Estimación del CAS',
              },
            ],
          },
          {
            title: 'Presentar estimación',
            inner: [
              {
                title: 'Elaborar estimación',
              },
            ],
          },
          {
            title: 'Transporte de pesonal',
            inner: [
              {
                title: 'Estado de unidades de transporte',
              },
            ],
          },
        ],
      },
      {
        title: 'B',
        inner: [
          {
            title: 'B.1',
            inner: [
              {
                title: 'B.1.1',
              },
              {
                title: 'B.1.2',
              },
            ],
          },
          {
            title: 'B.2',
            inner: [
              {
                title: 'B.2.1',
              },
            ],
          },
          {
            title: 'B.3',
            inner: [
              {
                title: 'B.3.1',
              },
            ],
          },
          {
            title: 'B.4',
            inner: [
              {
                title: 'B.4.1',
              },
            ],
          },
        ],
      },
      {
        title: 'C',
      },
      {
        title: 'D',
      },
    ],
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
    indentComputed,
  },
  data,
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

.tree-container {
  @apply bg-$white;
  @apply rounded-xl;

  .node-container-wrapper {

    .slot-node-content {
      @apply border-t border-solid border-gray-base;
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
