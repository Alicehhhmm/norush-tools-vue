import { mergeConfig } from 'vite';
import baseConfig from './vite.config.base';


export default mergeConfig(
  {
    mode: 'production',
    plugins: [

    ],
    build: {
      outDir: 'dist',
      assetsDir: 'static/assets',
      sourcemap: true,
      // 规定触发警告的 chunk 大小，消除打包大小超过500kb警告
      chunkSizeWarningLimit: 2000,
      // 静态资源打包到dist下的不同目录
      rollupOptions: {
        output: {
          manualChunks: {
            arco: ['@arco-design/web-vue'],
            chart: ['echarts', 'vue-echarts'],
            vue: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
          },
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        },
      },
    },
  },
  baseConfig
);
