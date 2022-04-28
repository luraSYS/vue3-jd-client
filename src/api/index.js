// 导入处理用户请求
import User from './user'
// 导入处理商品请求
import Product from './product'
// 导入处理收货地址请求
import Address from './address'
// 导入处理购物车请求
import Car from './shoppingcar'

import store from '@/store'
import { Toast } from 'vant'
import router from '@/router'

// 一、用户相关
// 获取用户信息
export async function getUser() {
  const res = await User.reqGetUser()
  if (res.status == 0) {
    store.commit('User/saveUser', res.data)
  }
}
// 用户登录模块(账号密码和手机号登录)
export async function userLogin(values) {
  const res = await User.reqLogin(values)
  if (res.status == 0) {
    localStorage.setItem('token', res.token)
    // 登录成功延迟1s后进入主页
    setTimeout(() => {
      getUser()
      router.push({ path: '/mine' })
    }, 1000)
  }
  Toast(res.message)
}
export async function userLogin2(values) {
  const res = await User.reqLogin2(values)
  if (res.status == 0) {
    localStorage.setItem('token', res.token)
    // 登录成功延迟1s后进入主页
    setTimeout(() => {
      getUser()
      router.push({ path: '/mine' })
    }, 1000)
  }
  Toast(res.message)
}
export async function userRegister(values) {
  const res = await User.reqRegister(values)
  if (res.status == 0) {
    setTimeout(() => {
      router.push({ path: '/mine/login' })
    }, 1200)
  }
  Toast(res.message)
}

// 二、商品相关
// 特别注意：上拉刷新有关的若是刚好为8的整数倍要手动停止（res为失败的数据）
// 获取模块商品
export async function getProduct(part, page) {
  const res = await Product.reqProductPart(part, page)
  if (res.status == 0)
    store.commit('Shop/saveProduct', { data: res.data, part })
  else store.commit('Shop/stopProduct', part)
}

// 获取推荐商品
export async function getRecommend(userid, page) {
  const res = await Product.reqRecommend(userid, page)
  if (res.status == 0) store.commit('User/saveRecommend', res.data)
  else store.commit('User/stopRecommend')
}

// 三、收货地址相关
// 获取用户收货地址
export async function getAddress(userid) {
  if (!store.state.User.isLogin) Toast('请先登录')
  // 地址渲染完后不再次发请求
  else {
    const res = await Address.reqAddress(userid)
    if (res.status == 0) store.commit('User/saveAddress', res.data)
  }
}
// 设置默认收货地址
export async function setDefAddress(data) {
  const res = await Address.reqSetDefAddress(data)
  if (res.status == 0) getAddress(data.userid)
}
// 添加新的收货地址
export async function addAddress(data) {
  const res = await Address.reqAddAddress(data)
  // console.log(res)
  if (res.status == 0) getAddress(data.userid)
}
// 修改收货地址
export async function modAddress(data, receiptid, userid) {
  const res = await Address.reqModAddress(data, receiptid, userid)
  if (res.status == 0) store.commit('User/modAddress')
  Toast(res.message)
}

// 四、购物车相关
export async function getCar(userid) {
  const res = await Car.reqGetShoppingCar(userid)
  if (res.status == 0) store.commit('User/saveCars', res.data)
}
