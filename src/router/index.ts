import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import OneView from '@/views/OneView.vue';
import TwoView from '@/views/TwoView.vue';
import ThreeView from '@/views/ThreeView.vue';
import FourView from '@/views/FourView.vue';
import FiveView from '@/views/FiveView.vue';
import SixView from '@/views/SixView.vue';
import NewView from '@/views/NewView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/one',
    name: 'one',
    component: OneView,
  },
  {
    path: '/two',
    name: 'two',
    component: TwoView,
  },
  {
    path: '/three',
    name: 'three',
    component: ThreeView,
  },
  {
    path: '/four',
    name: 'four',
    component: FourView,
  },
  {
    path: '/five',
    name: 'five',
    component: FiveView,
  },
  {
    path: '/six',
    name: 'six',
    component: SixView,
  },
  {
    path: '/new',
    name: 'new',
    component: NewView,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
