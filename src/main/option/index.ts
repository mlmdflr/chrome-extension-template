import { createApp } from 'vue'
import App from './App.vue'
// import store from "./store";
import naiveUi from 'naive-ui'

let app
function render() {
  app = createApp(App)
  //   app.use(store)
  app.use(naiveUi)
  app.mount('#option')
}
render()
