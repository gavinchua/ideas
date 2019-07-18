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
  },
  removeAppData: (state, payload) => {
    const index = state.appData.findIndex(item => item.id === payload);
    if (index !== -1) {
      state.appData.splice(index, 1);
    }
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
  },
  commitRemoveAppData: ({ commit }, payload) => {
    commit('removeAppData', payload);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
