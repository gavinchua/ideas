import Vue from 'vue';
import VueProgressBar from 'vue-progressbar';
import VueLoadersBallBeat from 'vue-loaders/dist/loaders/ball-beat';
import Toasted from 'vue-toasted';
import Vuelidate from 'vuelidate';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlusSquare, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import App from '@/App';
import router from '@/router';
import store from '@/store';

import 'vue-loaders/dist/vue-loaders.css';
import '@/assets/css/main.css';

const VueProgressBarOptions = {
  color: '#35495E',
  failedColor: '#ff0000',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  }
};

Vue.use(VueProgressBar, VueProgressBarOptions);
Vue.use(VueLoadersBallBeat);
Vue.use(Toasted, {
  iconPack: 'fontawesome',
  router
});
Vue.use(Vuelidate);

library.add(faPlusSquare, faTrashAlt, faEdit);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
