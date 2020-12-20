import Home from '@/views/Home.vue';
import PageNotFound from '@/views/PageNotFound.vue';
import CategoryForm from '@/views/category/CategoryForm.vue';
import CategoryList from '@/views/category/CategoryList.vue';
import Subcategory from '@/views/Subcategory.vue';
import OriginList from '@/views/origin/OriginList.vue';
import OriginForm from '@/views/origin/OriginForm.vue';
import Income from '@/views/Income.vue';
import Expense from '@/views/Expense.vue';
import Transaction from '@/views/Transaction.vue';

export default [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'Cash Control - SPA' },
  },
  {
    path: '/category/list',
    alias: ['/category'],
    name: 'CategoryList',
    component: CategoryList,
    meta: { title: 'Categorias' },
  },
  {
    path: '/category/form',
    alias: ['/category/add'],
    name: 'CategoryForm',
    props: true,
    component: CategoryForm,
    meta: { title: 'Categoria - Cadastrar' },
  },
  {
    path: '/subcategory',
    name: 'Subcategory',
    component: Subcategory,
    meta: { title: 'Subcategorias' },
  },
  {
    path: '/origin/list',
    alias: ['/origin'],
    name: 'OriginList',
    component: OriginList,
    meta: { title: 'Origens' },
  },
  {
    path: '/origin/form',
    alias: ['/origin/add'],
    name: 'OriginForm',
    props: true,
    component: OriginForm,
    meta: { title: 'Origens - Cadastrar' },
  },
  {
    path: '/transaction',
    name: 'Transaction',
    component: Transaction,
    meta: { title: 'Movimentações' },
  },
  {
    path: '/income',
    name: 'Income',
    component: Income,
    meta: { title: 'Receitas' },
  },
  {
    path: '/expense',
    name: 'Expense',
    component: Expense,
    meta: { title: 'Despesas' },
  },
  {
    path: '*',
    component: PageNotFound,
    meta: { title: 'Página não encontrada!' },
  },
];
