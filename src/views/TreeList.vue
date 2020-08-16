<template>
  <div>
    <tree-nodes-dl
      data-cy="treeNodes"
      class="tree-container mt-8"
      children="inner"
      text="title"
      :indent="15"
      :nodes="treeData"
      v-slot="{ node, isOpen }"
    >
      <div class="slot-node" data-cy="treeNodeSlot">
        <span v-if="!isOpen && node.inner">+</span>
        <span v-if="isOpen && node.inner">-</span>
        <h2
          :class="{'lm': !node.inner }"
        >Desde slot: {{node.title}}</h2>
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

function data() {
  return {
    treeData: [
      {
        title: 'A',
        otherProp: false,
        inner: [
          {
            title: 'A.1',
            inner: [
              {
                title: 'A.1.1',
              },
            ],
          },
          {
            title: 'A.2',
            inner: [
              {
                title: 'A.2.1',
              },
              {
                title: 'A.2.2',
              },
            ],
          },
          {
            title: 'A.3',
            inner: [
              {
                title: 'A.3.1',
              },
            ],
          },
          {
            title: 'A.4',
            inner: [
              {
                title: 'A.4.1',
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
  },
  data,
};
</script>
<style lang="scss">
.collapsing-enter-active {
  animation: bounce-in 1.25s;
}
.collapsing-leave-active {
  animation: bounce-in .7s reverse;
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
  .node-container-wrapper {
    overflow: hidden;
  }
}
.slot-node {
  align-items: center;
  cursor: default;
  display: flex;
  span {
    font-weight: bold;
    font-size: 20px;
    height: 20px;
    margin-right: 10px;
    width: 20px;
  }
  h2 {
    width: 100%;
    &.lm {
      margin-left: 30px;
    }
  }
  button {
    cursor:pointer;
    width: 10%;
  }
}

.tree-container {
  border-top: 1px solid #666666;
  .node-container-wrapper {
    .slot-node-content {
      border-bottom: 1px solid #666666;
      color: #666666;
      cursor:pointer;
      padding: 5px;
    }
  }
}
</style>
