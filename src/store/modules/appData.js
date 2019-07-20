import axios from 'axios';

const state = {
  appData: []
};

const getters = {
  getAppData: state => state.appData,
  getIdeaById: (state, getters) => (id) => {
    return getters.getAppData.find(item => item.id === id);
  }
};

const mutations = {
  setAppData: (state, payload) => {
    state.appData = payload;
  },
  addAppData: (state, payload) => {
    state.appData.push(payload);
  },
  updateAppData: (state, payload) => {
    const index = state.appData.findIndex(item => item.id === payload.id);
    if (index !== -1) {
      state.appData.splice(index, 1, payload);
    }
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
  commitAddAppData: ({ commit }, payload) => {
    commit('addAppData', payload);
  },
  commitUpdateAppData: ({ commit }, payload) => {
    commit('updateAppData', payload);
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
