import Vue from 'vue';
import Vuex from 'vuex';
import Task from './task';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currencies: [
      { code: 'PEN', name: 'Sol', symbol: '/S.' },
      { code: 'USD', name: 'Dolar', symbol: '$' },
    ],
    defaultCurrency: 'PEN',
  },
  mutations: {},
  actions: {},
  modules: {
    Task: { namespaced: true, ...Task },
  },
});
