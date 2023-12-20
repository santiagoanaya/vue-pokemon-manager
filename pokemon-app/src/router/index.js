import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';
import ListView from '../views/ListView.vue';
import DetailView from '../views/DetailView.vue';
Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/pokemons-list',
      name: 'ListView',
      component: ListView
    },
    {
      path: '/detail/:id',
      name: 'DetailView',
      component: DetailView
    },
  ]
});