// 网络层内容
import axios from 'axios'
import Vue from 'vue'
import '../../mock/server'

// 1. 功能配置
// 上报
window.trace = (key, value) => {
  // 上报网络层ready
}
// 全局变量获取
// 从ua抓取
window.env = {}

// 2. 网络配置
if (!Vue.prototype.$ajax) {
  // 1. 安全配置
  // 面试题：如何规避csrf问题
  const CSRF_KEY = '_csrf'
  // 模拟后台往cookie中注入的码
  const cMap = {
    _csrf: 'ifjdsoifasodfjiasjdfo',
    _token: 'fjidjoifoidsjofjoas'
  }

  // 登录超时
  let lastRequestSettings = []
  let going = false

  // 面试：如何拦截请求做通用参数补充
  // 拦截器配置
  axios.interceptors.request.use(function (config) {
    // 请求上报
    window.trace('request', Date.now(), config.params)

    let csrf = cMap[CSRF_KEY]
    if (csrf) {
      switch (config.method) {
        case 'get':
        case 'delete':
        case 'options':
          config.params = config.params || {}
          config.params[CSRF_KEY] = csrf
          break
        case 'post':
        case 'put':
          config.data = config.data || {}
          if (typeof config.data === 'string') {
            let str = config.data
            try {
              config.data = JSON.parse(str)
            } catch (e) {
              config.data = str
            }
          }
          config.data[CSRF_KEY] = csrf
          break
        default:
          break
      }
    }
    return config
  })

  axios.interceptors.response.use(
    function (res) {
      return res.data
    },
    function (error) {
      // 面试点：登录态超时处理逻辑？
      // => 1. 约定好登录超时code => 2. 做相应处理
      let url = error && error.config && error.config.url

      // a. 支持数据接口返回数据
      // code === 3 表示登录态过期
      if (url) {
        if (error.code === 3) {
          error.status = 508
        } else {
          error.status = 608
        }
      }

      // 错误上报
      window.trace('error', Date.now(), error)
      // b. 状态码返回过期
      if (error.status === 508) {
        // 登录过期操作
      }
    }
  )

  // 断点续传
  let defers = []
  axios.goon = function () {
    let len = lastRequestSettings.length
    let config

    if (len === 0 || going) {
      return
    }

    // 续传上报
    window.trace('goon', Date.now())

    // 防止ajax同组多次触发
    going = true
    for (let i = 0; i < len; i++) {
      // 重发的请求不再进行存储
      config = lastRequestSettings[i]
      config.ignore = true

      // 重发队列组装
      assembleQueue(config)
    }

    Promise.all(defers)
      .then(() => {
        lastRequestSettings = []
        going = false
      })
      .catch(() => {
        going = false
      })

    return axios
  }

  const assembleQueue = function (config) {
    let defer = axios.request(config)

    defer.then(
      data => {
        config.promise.resolve(data)
      },
      error => {
        error && error.status !== 508 && config.promise.reject(error)
      }
    )

    defers.push(defer)
  }

  Vue.prototype.$ajax = axios
}

export default Vue.prototype.$ajax
