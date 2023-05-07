import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 引入 Pinia 状态持久化插件
// import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// 导入normalize样式格式化
import '@/styles/normalize.css'
// 导入Unocss样式
import 'uno.css'

// 将对应插件或工具挂载到Vue上
const app = createApp(App)

app.use(router)
const pinia = createPinia() // 创建 Pinia 实例
// pinia.use(piniaPluginPersistedstate) // 使用 Pinia 状态持久化插件
app.use(pinia)

app.mount('#app')
