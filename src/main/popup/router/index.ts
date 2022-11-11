import { createRouter, createWebHashHistory } from 'vue-router'
import home from '@/main/popup/router/pages/home'

const Router = createRouter({
  history: createWebHashHistory(),
  routes: [...home],
})

export default Router
