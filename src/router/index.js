import Vue from 'vue';
import VueRouter from 'vue-router'
import Home from "@/pages/Home";
import CategoryList from "@/pages/categoria/CategoryList";
import CategoryForm from "@/pages/categoria/CategoryForm";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: "/category/list",
        name: "categoryList",
        component: CategoryList
    },
    {
        path: "/category/form",
        name: "categoryForm",
        component: CategoryForm
    }
]


export default new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})