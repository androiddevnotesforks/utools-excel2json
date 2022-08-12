import { createApp } from 'vue'
import '@unocss/reset/tailwind.css'
import { createPinia } from 'pinia'
import App from './App.vue'
import '@arco-design/web-vue/dist/arco.less'
import '@arco-design/web-vue/es/message/style/css.js'
import 'uno.css'
import '@/styles/index.scss'
import 'shepherd.js/dist/css/shepherd.css'

createApp(App).use(createPinia()).mount('#app')
