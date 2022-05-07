import { createRouter, createWebHashHistory } from 'vue-router'
// 一级路由
import Home from '../views/Home'
import Mine from '../views/Mine'
import Address from '../views/Address'
import Car from '../views/ShoppingCar'
import Category from '../views/Category'
import Account from '../views/Account'
import Error from '../views/Error'
// 二级路由
import MyHome from '../views/Home/MyHome'
import Detail from '../views/Home/Detail'
import Login from '../views/Mine/Login'
import LogByPhone from '../views/Mine/Login/Byphone.vue'
import Register from '../views/Mine/Register'
import User from '../views/Mine/User'
import MyAddress from '../views/Address/MyAddress'
import ModAddress from '../views/Address/ModAddress'
import MyAccount from '../views/Account/MyAccount'
import UserMod from '../views/Account/UserMod'
import Order from '../views/Account/Order'
import OrderDetail from '../views/Account/Order/Detail'
import MyCategory from '../views/Category/MyCategory.vue'
import Cate from '../views/Category/Cate.vue'

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: { showH: true, showF: true },
    children: [
      { path: '', name: 'myhome', component: MyHome },
      { path: 'detail', meta: { showF: false }, component: Detail },
    ],
  },
  {
    path: '/mine',
    name: 'mine',
    component: Mine,
    meta: { showH: false, showF: true },
    children: [
      { path: '', component: User },
      { path: 'logphone', component: LogByPhone },
      { path: 'login', component: Login },
      { path: 'register', component: Register },
    ],
  },
  {
    path: '/car',
    name: 'car',
    component: Car,
    meta: { showH: false, showF: true },
  },
  {
    path: '/address',
    name: 'address',
    component: Address,
    meta: { showH: false, showF: false },
    children: [
      { path: '', component: MyAddress },
      { name: 'mod', path: 'mod', component: ModAddress },
    ],
  },
  {
    path: '/category',
    name: 'category',
    component: Category,
    meta: { showH: true, showF: true },
    children: [
      { path: '', component: MyCategory },
      { path: 'cate', name: 'cate', component: Cate },
    ],
  },
  {
    path: '/account',
    name: 'account',
    component: Account,
    meta: { showH: false, showF: false },
    children: [
      { path: '', component: MyAccount },
      { path: 'mod', component: UserMod },
      { path: 'order', component: Order },
      { path: 'detail', name: 'odetail', component: OrderDetail },
    ],
  },
  {
    path: '/error',
    name: 'error',
    component: Error,
    meta: { showH: false, showF: false },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// 前置导航守卫（拦截未登录进入权限界面）
router.beforeEach((to, from, next) => {
  const reg = /^\/(address)|(account)/
  if (reg.test(to.path)) {
    if (!localStorage.getItem('token')) return next({ path: '/error' })
    if (localStorage.getItem('token') == 'logout')
      return next({ path: '/mine' })
  }
  return next()
})
export default router
