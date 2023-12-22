import Vue from 'vue'
import Router from 'vue-router'
const HomeView = () => import('../views/HomeView.vue')
const ListView = () => import('../views/ListView.vue')
const DetailView = () => import('../components/DetailModal.vue')
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/pokemon-list',
      name: 'ListView',
      component: ListView,
    },
    {
      path: '/detail/:id',
      name: 'DetailView',
      component: DetailView,
    },
  ],
})
