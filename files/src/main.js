import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.config.globalProperties.$filters = {
    dateFormat(date) {
        return `${date.toLocaleDateString('en-US')}, ${date.toLocaleTimeString('en-US')}`;
    }
}
app.mount('#app')