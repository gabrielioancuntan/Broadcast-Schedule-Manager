import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@fortawesome/fontawesome-free/css/all.css'
import 'vue-toastification/dist/index.css'
import Toast from 'vue-toastification'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const app = createApp(App)

app.use(router)
app.use(Toast)

app.mount('#app')
