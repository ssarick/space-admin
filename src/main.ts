import { createApp } from 'vue';
import { vMaska } from 'maska';
import { initGlobalApis } from './shared/api/init';
import i18n from './shared/plugins/i18n';
import pinia from './shared/plugins/pinia';
import router from './app/router';
import './app/styles/main.scss';
import App from './App.vue';

const app = createApp(App)
  .directive('mask', vMaska);

initGlobalApis();

app
  .use(i18n)
  .use(router)
  .use(pinia)
  .mount('#app');
