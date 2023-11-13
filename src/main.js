import { createApp, reactive } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Inject a global object to be available to every component
const GStore = reactive({ flashMessage: ''})
app.provide('GStore', GStore)

app.mount('#app')
