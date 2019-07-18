import Vue from 'vue';
import VueLoadersBallBeat from 'vue-loaders/dist/loaders/ball-beat';
import Vuelidate from 'vuelidate';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlusSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import App from '@/App';
import router from '@/router';
import store from '@/store';

import 'vue-loaders/dist/vue-loaders.css';
import '@/assets/css/main.css';

Vue.use(VueLoadersBallBeat);
Vue.use(Vuelidate);

library.add(faPlusSquare, faTrashAlt);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
