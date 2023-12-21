import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ListView from '../views/ListView.vue'
import DetailView from '../components/DetailView.vue'
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
