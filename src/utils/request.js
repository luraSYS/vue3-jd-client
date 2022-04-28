import axios from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
const request = axios.create({
  baseURL: 'http://127.0.0.1:8080',
  timeout: 5000,
})
// 请求拦截器--(在请求发出前做的一些事)
request.interceptors.request.use((config) => {
  // 启动进度条
  nprogress.start()
  console.log('kaishi' + config.url)
  config.headers.Authorization = localStorage.getItem('token')
  return config
})
// 响应拦截器--(请求发出之后的响应<成功或失败>做的一些操作)
request.interceptors.response.use(
  // 成功的回调
  (res) => {
    console.log('jieshu')

    // 结束进度条并处理返回的响应数据
    nprogress.done()
    return res.data
  },
  // 失败的回调
  (err) => {
    console.log('服务器响应失败:' + err)
  }
)

// 封装好出口
export default request
