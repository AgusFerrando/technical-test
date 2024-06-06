import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PlanetDetail from '@/views/PlanetDetail.vue'
import PlanetsList from '@/views/PlanetsList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/planets-list',
      name: 'PlanetList',
      component: PlanetsList
    },
    {
      path: '/planet-detail/:name',
      name: 'PlanetDetail',
      component: PlanetDetail
    },
  ]
})

export default router
