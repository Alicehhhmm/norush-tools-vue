import { mergeConfig, loadEnv } from 'vite';
import baseConfig from './vite.config.base';



export default mergeConfig(

  {
    mode: 'development',
    server: {
      host: '0.0.0.0',
      port: '8080',
      open: true,
      fs: {
        strict: true,
      },
      // 本地服务 CORS 是否开启
      // cors: true,
      // proxy: {
      //   [viteEnv.VITE_BASE_URL]: {
      //     target: viteEnv.VITE_BASE_SERVER_URL,
      //     changeOrigin: true,// 允许跨域
      //     rewrite: path => path.replace(viteEnv.VITE_BASE_URL, '/')
      //   }
      // }
    },
    plugins: [

    ],
  },
  baseConfig
);
