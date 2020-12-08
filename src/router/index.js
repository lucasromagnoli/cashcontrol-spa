import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import updatePageTitle from './middlewares';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(updatePageTitle);

export default router;
