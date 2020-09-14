const state = () => ({
  detail: {},
  list: [],
  newTaskDefault: {
    asigned: '',
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
const actions = {};
const getters = {};
const mutations = {};

export default {
  actions, getters, mutations, state,
};
