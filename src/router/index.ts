import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import DayList from '../components/DayList.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'DayList',
    component: DayList,
  },
  {
    path: '/day/:dayNumber',
    name: 'Day',
    component: () => import(/* webpackChunkName: "day" */ '../components/Day.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
