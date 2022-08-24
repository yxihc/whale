import { createApp } from 'vue'
import './style.css'
import WlErmForm from '@whale/components/erm-form'
import App from './App.vue'

const app = createApp(App)

app.use(WlErmForm)

app.mount('#app')
