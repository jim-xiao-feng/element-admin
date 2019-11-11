import axios from 'axios'
import store from 'src/store'
import { Message } from 'element-ui'

// 创建axios实例
const http = axios.create({
  baseURL: 'http://localhost:3000/api', // api的base_url
  timeout: 5000                     // 请求超时时间
})

// request拦截器
http.interceptors.request.use(config => {
  const token = store.state.user.token
  if (token) {
    config.headers['authorization'] = `Bearer ${token}`
  }
  return config
})

// response拦截器
http.interceptors.response.use(response => {
  const res = response.data
  if (res.code === 20000) {
    return res.data
  }
}, httpErrorHandler)

function httpErrorHandler(error) {
  let errorMessage = ''
  const { message, response: { status } } = error
  if (message.indexOf('Network Error') !== -1) {
    errorMessage = '网络异常，请检查当前设备网络状况。'
  } else if (message.indexOf('timeout') !== -1) {
    errorMessage = '网络超时，请稍后重试。'
  } else {
    if (status >= 500) {
      errorMessage = `服务器异常，错误码：${response.status}`
    } else {
      errorMessage = message
    }
  }
  Message({
    message: errorMessage,
    type: 'error'
  })
  return Promise.reject(error)
}

export default http