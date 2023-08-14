/**
 * Theme import
 * 样式按需引入
 * https://arco.design/vue/docs/start
 */
import { vitePluginForArco } from '@arco-plugins/vite-vue';

export default function configArcoStyleImportPlugin() {
  const arcoResolverPlugin = vitePluginForArco({});
  return arcoResolverPlugin;
}