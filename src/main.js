import './assets/index.css'
import persistStatePlugin from './stores/persistStatePlugin'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia();
pinia.use(persistStatePlugin);

app.use(pinia)
app.use(router)
app.mount('#app')
