import { createApp } from 'vue'

import store from './store';
import router from './router'
import i18n from './locale';
import './mock';


import 'uno.css' // 必须引入unocss样式(因为它存在与依赖包中)
import '@/assets/style/normalize.css'
import '@/assets/style/global.less';
import App from './App.vue'



const app = createApp(App)

app.use(store);
app.use(router)
app.use(i18n);

app.mount('#app')
