/* eslint-disable no-param-reassign */
import { equality, findIndex } from 'functionallibrary';

import gqlApi from '@/Apollo';

import { getFlatListTasks, getHierarchyTasks } from '@/api/task/query';
import { CreateHierarchyTaskMutation } from '@/api/task/mutation';

const state = () => ({
  detail: {},
  flatList: [],
  hierarchy: [],
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
  hierarchy({ commit }) {
    gqlApi.query(getHierarchyTasks())
      .then(({ data }) => {
        commit('SET_HIERARCHY_LIST', data.tasks);
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
  SET_HIERARCHY_LIST(st, tasks) {
    st.hierarchy = [...tasks];
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
