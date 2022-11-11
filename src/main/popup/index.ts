import { createApp } from 'vue'
import App from './App.vue'
import naiveUi from 'naive-ui'
import router from './router'

router.addRoute({
  path: '/',
  redirect: '/home',
})
createApp(App).use(router).use(naiveUi).mount('#popup')
