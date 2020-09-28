/* eslint-disable no-param-reassign */
import { equality, findIndex, mergeObjects } from 'functionallibrary';

const state = () => ({
  detail: {},
  list: [],
  newTaskDefault: {
    asigned: '',
    budget: 0,
    checkList: [],
    comments: '',
    expenses: [],
    labels: [],
    related: [],
    time: {
      endDate: '',
      duration: 0,
      initDate: '',
    },
    title: '',
    subtasks: [],
    subTaskOf: null,
  },
});
const actions = {
  edit(store, task) {
    store.commit('SET_DETAIL', task);
  },
  async save(store, task) {
    const newTask = mergeObjects(store.state.newTaskDefault, task);
    store.commit('SET_NEW_TASK', newTask);
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
