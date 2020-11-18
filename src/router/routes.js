import homePage from '@/pages/Home';
import categoryPage from '@/pages/Category';
import OriginForm from '@/pages/origens/OriginForm';
import OriginList from '@/pages/origens/OriginList';

const routes = [
  {
    path: '/',
    name: 'home',
    component: homePage
  },
  {
    path: '/category',
    name: 'category',
    component: categoryPage
  },
  {
    path: '/origin',
    name: 'originForm',
    component: OriginForm,
  },
  {
    path: '/origin/list',
    name: 'originList',
    component: OriginList,
  },
]

export default routes;