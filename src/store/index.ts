import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import useUserStore from './modules/user';


/**
 * @description
 * @param Pinia |状态管理
 * @param piniaPluginPersistedstate | Pinia 状态持久化插件
 */
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)

export { useUserStore }

export default pinia;
