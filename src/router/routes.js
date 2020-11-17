import homePage from "@/pages/Home";
import categoryPage from "@/pages/Category";

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
  }
]

export default routes;