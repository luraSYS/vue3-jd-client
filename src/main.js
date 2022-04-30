import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vant from 'vant'
import { Lazyload } from 'vant'
import 'vant/lib/index.css'

createApp(App)
  .use(store)
  .use(router)
  .use(vant)
  .use(Lazyload, {
    lazyComponent: true,
  })
  .mount('#app')
