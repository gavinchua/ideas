import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import appData from '@/store/modules/appData';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    appData
  },
  plugins: [createPersistedState()]
});
