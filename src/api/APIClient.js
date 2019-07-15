import axios from 'axios';
import NProgress from 'nprogress';

import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false });

const apiClient = axios.create({
  baseURL: 'data/'
  // baseURL: 'https://kee.amiculum-digital.biz/Umbraco/api/JsonData/'
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
  getCalendar(calendar) {
    return apiClient.get('calendar.json', calendar);
    //return apiClient.get('CalendarJson', calendar );
  },
  getAMChart(amchart) {
    return apiClient.get('amchart.json', amchart);
    // return apiClient.get('AmchartJson', amchart );
  }
};
