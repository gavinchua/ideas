import Vue from 'vue';
import axios from 'axios';
import app from '@/main';

const apiClient = axios.create({
  baseURL: 'http://www.amock.io/api/gavinchua/'
});

apiClient.interceptors.request.use(config => {
  app.$Progress.start();
  return config;
});

apiClient.interceptors.response.use(response => {
  app.$Progress.finish();
  return response;
});

export default {
  getCalendar(calendar) {
    return apiClient.get('ideas', calendar);
  }
};
