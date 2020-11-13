/* eslint-disable no-param-reassign */
import { equality, findIndex } from 'functionallibrary';

import gqlApi from '@/Apollo';

import { getFlatListTasks, getHierarchyTasks } from '@/api/hierarchy/query';
import { CreateHierarchyTaskMutation } from '@/api/hierarchy/mutation';

const state = () => ({
  detail: {},
  flatList: [],
  list: [],
  newTaskDefault: {
    asigned: '',
    budget: 0,
    checkList: [],
    comments: '',
    expenses: [],
    labels: [],
    name: '',
    relatedTasks: [{
      condition: '',
      taskId: '',
      name: '',
    }],
    time: {
      endDate: '',
      duration: 0,
      initDate: '',
    },
    subTasks: [],
  },
});

const actions = {
  edit(store, task) {
    store.commit('SET_DETAIL', task);
  },
  flatList({ commit }) {
    gqlApi.query(getFlatListTasks())
      .then(({ data }) => {
        commit('SET_FLAT_LIST', data.tasks);
      })
      .catch((error) => console.log('Error al cargar flatList', error));
  },
  list({ commit }) {
    gqlApi.query(getHierarchyTasks())
      .then(({ data }) => {
        commit('SET_LIST', data.tasks);
      })
      .catch((error) => console.log('Client Error al cargar lista jerárquica', error));
  },
  async save(store, task) {
    try {
      const { data } = await gqlApi.mutate({
        mutation: CreateHierarchyTaskMutation,
        variables: {
          CreateTaskInput: task,
        },
      });
      store.commit('SET_NEW_TASK', data.createTask.task);
    } catch (error) {
      console.error('Error creando actividad jerarquica', error);
    }
  },
  async update(store, task) {
    const id = task.id || 1;
    const getIndexIn = findIndex(equality('id', id));
    const index = getIndexIn(store.state.list);
    store.commit('UPDATE_TASK', { index, task });
  },
};

const getters = {};

const mutations = {
  SET_DETAIL(st, task) {
    st.detail = { ...task };
  },
  SET_FLAT_LIST(st, tasks) {
    st.flatList = [...tasks];
  },
  SET_LIST(st, tasks) {
    st.list = [...tasks];
  },
  SET_NEW_TASK(st, newTask) {
    st.list.push(newTask);
  },
  UPDATE_TASK(st, { index, task }) {
    st.list.splice(index, 1, task);
  },
};

export default {
  actions, getters, mutations, state,
};
