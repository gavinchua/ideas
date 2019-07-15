import axios from 'axios';
import NProgress from 'nprogress';

import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false });

const apiClient = axios.create({
  baseURL: 'data/'
});

apiClient.interceptors.request.use(config => {
  NProgress.start();
  return config;
});

apiClient.interceptors.response.use(response => {
  NProgress.done();
  return response;
});

export default {
  getData(data) {
    return apiClient.get('data.json', data);
  }
};
