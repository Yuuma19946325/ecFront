import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/views/HomeView.vue'
import ManagerMenu from '../pages/views/ManagerMenu.vue'
import GoodsManager from '../pages/views/GoodsManager.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../pages/views/AboutView.vue')
    },
    {
      path: '/managerMenu',
      name: 'managerMenu',
      component: ManagerMenu
    },
    {
      path: '/goodsManager',
      name: 'goodsManager',
      component: GoodsManager
    }
  ]
})

export default router
