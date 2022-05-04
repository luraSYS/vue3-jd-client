// 导入封装好的axios
import $http from '@/utils/request'

// 用户登录
const reqLogin = (data) => $http({ method: 'post', url: '/api/login', data })

// 手机号登录
const reqLogin2 = (data) =>
  $http({ method: 'post', url: '/api/logbypho', data })

// 用户注册
const reqRegister = (data) =>
  $http({ method: 'post', url: '/api/register', data })

// 获取用户信息
const reqGetUser = (data) => $http({ url: '/mine/user', data })

// 修改用户账户余额
const reqModAccout = (data) =>
  $http({ method: 'post', url: '/mine/mod/account', data })

export default {
  reqLogin,
  reqLogin2,
  reqRegister,
  reqGetUser,
  reqModAccout,
}
