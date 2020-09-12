import Vue from 'vue';
import Vuex from 'vuex';
import HierarchyTask from './hierarchy';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    HierarchyTask: { namespaced: true, ...HierarchyTask },
  },
});
