import { createApp } from 'vue'
import '@unocss/reset/tailwind.css'
import App from './App.vue'
import '@arco-design/web-vue/dist/arco.less'
import '@arco-design/web-vue/es/message/style/css.js'
import 'uno.css'
import '@/styles/index.scss'
import 'shepherd.js/dist/css/shepherd.css'
import { createPinia } from 'pinia'

createApp(App).use(createPinia()).mount('#app')
