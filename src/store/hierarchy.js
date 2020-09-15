import { mergeObjects } from 'functionallibrary';

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
  async save(store, task) {
    const newTask = mergeObjects(store.state.newTaskDefault, task);
    store.commit('SET_NEW_TASK', newTask);
  },
};
const getters = {};
const mutations = {
  SET_NEW_TASK(st, newTask) {
    st.list.push(newTask);
  },
};

export default {
  actions, getters, mutations, state,
};
