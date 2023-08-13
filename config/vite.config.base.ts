import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue'

/**
 * @description unplugin 自动化引入插件
 * @param AutoImport|API自动引入插件
 * @param Components|组件自动引入插件
 * @param {unplugin-vue-components/resolvers}|各类自动解析器
 */
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {
  ArcoResolver,
  VueUseComponentsResolver,
  VueUseDirectiveResolver
} from 'unplugin-vue-components/resolvers'

/**
 * @description icon 插件的引入
 * @param Icons|插件
 * @param IconsResolver|自动引入解析器
 * @param FileSystemIconLoader|加载 loader
 */
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

/**
 * @description Unocss 插件的引入
 * @param Unocss|插件
 * @param presetUno|默认预设
 * @param presetAttributify|属性模式预设
 * @param transformerDirective|指令插件
 */
import Unocss from 'unocss/vite'
import presetUno from '@unocss/preset-uno'
import presetAttributify from '@unocss/preset-attributify'
import transformerDirective from '@unocss/transformer-directives'

// https://vitejs.dev/config/
export default defineConfig({

  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, '../src'),
      },
    ]
  },
  plugins: [
    vue(),

    /**
     * @description 使用Unocss
     * @param {string} presets|预设
     * @param {string} transformers|指令转换插件
     * @param {string} rules|自定义规则
     */
    Unocss({
      presets: [presetUno(), presetAttributify()],
      transformers: [transformerDirective()],
      rules: []
    }),
    // 自动化引入配置
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/ // .md
      ],
      imports: ['vue', 'pinia', 'vue-router', '@vueuse/core'],
      // 生成相应的自动导入json文件。
      // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true
      },
      resolvers: [ArcoResolver()]
    }),
    Components({
      // imports 指定组件所在位置，默认为 src/components
      dirs: ['src/components/', 'src/view/', 'src/layout'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        ArcoResolver({
          sideEffect: true
        }),
        VueUseComponentsResolver(),
        VueUseDirectiveResolver(),
        IconsResolver({
          // icon自动引入的组件前缀 - 为了统一组件icon组件名称格式
          prefix: 'icon',
          // 自定义的icon模块集合
          customCollections: ['user', 'home']
        })
      ]
    }),
    // icon 插件
    Icons({
      compiler: 'vue3',
      customCollections: {
        // user图标集，给svg文件设置fill="currentColor"属性，使图标的颜色具有适应性
        user: FileSystemIconLoader('src/assets/svg/user', svg =>
          svg.replace(/^<svg /, '<svg fill="currentColor" ')
        ),
        // home 模块图标集
        home: FileSystemIconLoader('src/assets/svg/home', svg =>
          svg.replace(/^<svg /, '<svg fill="currentColor" ')
        )
      },
      autoInstall: true
    })
  ]
})
