import Vue from 'vue';
import Vuex from 'vuex';

import appData from '@/store/modules/appData';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    appData
  }
});
