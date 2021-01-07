import Vue from 'vue';
import { VueMaskDirective } from 'v-mask';
import VCurrencyField from 'v-currency-field';
import { VTextField } from 'vuetify/lib'; // Globally import VTextField
import App from './App.vue';
import './validations';
import './register-service-worker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.component('v-text-field', VTextField);
Vue.use(VCurrencyField, {
  locale: 'pt-BR',
  decimalLength: 2,
  autoDecimalMode: true,
  min: 0,
  max: null,
  defaultValue: 0,
  valueAsInteger: false,
  allowNegative: false,
});
Vue.directive('mask', VueMaskDirective);
Vue.config.productionTip = false;
window.bus = new Vue();

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
