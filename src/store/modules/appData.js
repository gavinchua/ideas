import axios from 'axios';

const state = {
  appData: []
};

const getters = {
  getAppData: state => state.appData
};

const mutations = {
  setAppData: (state, payload) => {
    state.appData = payload;
  }
};

const actions = {
  async fetchAppData({ commit }) {
    await axios
      .get('http://www.amock.io/api/gavinchua/ideas')
      .then(r => r.data)
      .then(appData => {
        commit('setAppData', appData);
      });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
