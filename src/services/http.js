import axios from 'axios'
import store from 'src/store'
import { Message } from 'element-ui'

// 创建axios实例
const http = axios.create({
  baseURL: 'http://localhost', // api的base_url
  timeout: 5000                // 请求超时时间
})

// request拦截器
http.interceptors.request.use(config => {
  const token = store.state.user.token
  if (token) {
    config.headers[koten] = token
  }
  return config
})

http.interceptors.response.use(response => {
  const res = response.data
  if (res.code === 2000) {
    return res
  }
}, error => {
  Message({
    message: error.message,
    type: 'error'
  })
  return Promise.reject(error)
})

export default http