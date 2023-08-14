import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import router from './router'
import i18n from './locale';
import './mock';


import 'uno.css' // 必须引入unocss样式(因为它存在与依赖包中)
import '@/assets/style/normalize.css'
import '@/assets/style/global.less';
import App from './App.vue'



/**
 * @description
 * @param Pinia |状态管理
 * @param router |路由
 * @param piniaPluginPersistedstate | Pinia 状态持久化插件
 */
const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(i18n);

app.mount('#app')
