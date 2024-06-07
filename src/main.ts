import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { Quasar } from 'quasar'
import quasarUserOptions from './quasar/quasar-user-options'

import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

import { createHead } from '@vueuse/head'

const app = createApp(App)
const head = createHead()

app.use(createPinia())
app.use(router)
app.use(Quasar, quasarUserOptions)
app.use(head)

app.mount('#app')
