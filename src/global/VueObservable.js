import Vue from 'vue';

export const store = Vue.observable({
  showMovilMenu: false,
});

export const mutations = {
  toggleMovilMenu() {
    store.showMovilMenu = !store.showMovilMenu;
  },
};
