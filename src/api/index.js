// 导入处理用户请求
import User from './user'
// 导入处理商品请求
import Product from './product'
// 导入处理收货地址请求
import Address from './address'
// 导入处理购物车请求
import Car from './shoppingcar'
// 导入处理订单请求
import Order from './order'

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
      getInfo()
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
      getInfo()
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
    }, 1000)
  }
  Toast(res.message)
}
// 修改用户账户余额
export async function UserModAccount(data) {
  const res = await User.reqModAccout(data)
  if (res.status == 0) store.commit('User/modUserAccount', data.account)
}
// 修改用户头像
export async function userModPic(pic_url, userid) {
  const res = await User.reqModProfile(pic_url, userid)
  if (!res || res.status == 1) return
  store.commit('User/modProfile', pic_url)
}
// 修改用户信息
export async function usermodInfo(info, userid) {
  const res = await User.reqModUserInfo(info, userid)
  if (!res || res.status == 1) return Toast('修改用户信息失败')
  store.commit('User/modInfo', info)
}
// 检查用户密码
export async function checkPsd(data) {
  const res = await User.reqCheckPsd(data)
  if (!res || res.status == 1) return Toast('原密码错误')
  store.commit('User/unLockModPsd')
}
// 二、商品相关
// 特别注意：上拉刷新有关的若是刚好为8的整数倍要手动停止（res为失败的数据）
// 获取模块+分类商品
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
// 获取商品详细信息
export async function getProductDetail(proid) {
  const res = await Product.reqProductDetail(proid)
  if (res.status == 0) store.commit('Shop/saveCurrentShop', res.data)
}

// 三、收货地址相关
// 获取用户收货地址
export async function getAddress(userid) {
  // 地址渲染完后不再次发请求
  const res = await Address.reqAddress(userid)
  if (res.status == 0) store.commit('User/saveAddress', res.data)
}
// 设置默认收货地址
export async function setDefAddress(data) {
  const res = await Address.reqSetDefAddress(data)
  if (res.status == 0) getAddress(data.userid)
}
// 添加新的收货地址
export async function addAddress(data) {
  const res = await Address.reqAddAddress(data)
  if (res.status == 0) getAddress(data.userid)
}
export async function addAddress2(data) {
  const res = await Address.reqAddAddress2(data)
  if (res.status == 0) getAddress(data.userid)
  Toast(res.message)
}
// 修改收货地址
export async function modAddress(data, receiptid, userid) {
  const res = await Address.reqModAddress(data, receiptid, userid)
  if (!res || res.status == 1) return Toast('修改地址信息失败')
  const mydata = {
    address: data.address,
    area: data.area,
    code: data.code,
    detail: data.detail,
    id: parseInt(receiptid),
    isDefault: data.def,
    name: data.name,
    tel: data.phone,
  }
  store.commit('User/modAddress', mydata)
  Toast('修改地址信息成功')
}
// 删除收货地址
export async function delAddress(receiptid) {
  const res = await Address.reqDelAddress(receiptid)
  if (res.status == 0) store.commit('User/delAddress', receiptid)
  Toast(res.message)
}

// 四、购物车相关
// 获取用户购物车信息
export async function getCar(userid) {
  const res = await Car.reqGetShoppingCar(userid)
  if (res.status == 0) store.commit('User/saveCars', res.data)
}
// 添加商品至购物车
export async function AddToCar(data) {
  let product = {
    proid: data.proid,
    checked: true,
    quantity: 1,
  }
  // 从商品详情处添加（加上商品信息）
  if (store.state.Shop.current.have) {
    product.proname = store.state.Shop.current.info.proname
    product.detail = store.state.Shop.current.info.detail
    product.showpic = store.state.Shop.current.info.showpic
    product.price = store.state.Shop.current.info.price.toFixed(2)
  }
  const res = await Car.reqAddToCar(data)
  if (res.status == 0) store.commit('User/addToCar', product)
  Toast(res.message)
}

export async function DelFromCar(data) {
  const res = await Car.reqDelFromCar(data)
  if (res.status == 0) store.commit('User/delFromCar', data.proid)
}

// 五、用户订单相关
// 获取用户所有订单号
export async function getOrder(userid) {
  let orderList = []
  const { status, data, message } = await Order.reqGetOrderId(userid)
  if (status == 0)
    for (let i = 0; i < data.length; i++) {
      let d = { userid, orderitemid: data[i].orderitemid }
      const { data: item } = await Order.reqGetOrderDetail(d)
      orderList.push(item)
    }
  else Toast(message)
  return store.commit('User/saveOrders', orderList)
}
// 结算商品，添加至订单表
export async function addOrders(data) {
  // console.log(data)
  const res = await Order.reqAddOrder(data)
  if (!res || res.status == 1) return Toast('添加至订单失败')
  // 修改用户账户余额
  const account = (store.state.User.user.account - data.pay).toFixed(2)
  UserModAccount({ account, userid: data.userid })
  Toast('添加至订单成功')
}
// 添加至订单详情
export async function addOrderItem(data) {
  await Order.reqAddOrderItem(data)
}

// 获取一套用户信息
export async function getInfo() {
  const res = await User.reqGetUser()
  // console.log(res)
  if (!res || res.status == 1) return Toast('请先登录')
  const user = res.data
  store.commit('User/saveUser', res.data)
  if (store.state.User.firstGetCar) getCar(user.userid)
  if (!store.state.User.visitedAddress) getAddress(user.userid)
  if (store.state.User.firstRecommend)
    getRecommend(user.userid, store.state.User.recommend.page)
}
