export default {
  namespaced: true,
  state: {
    isLogin: false,
    // visitedAddress: false,
    firstRecommend: true,
    firstGetCar: true,
    firstGetOrders: true,
    user: {
      // 用户信息相关(userinfo)
      account: 0,
      phone: '-',
      username: '请登录/注册您的账号',
      userpic: 'https://i.ibb.co/djbr6dh/default.png',
      userid: -1,
      // 我的足迹(my-track)
      collection_pro: 0,
      collection_shops: 0,
      my_track: 0,
      // 我的打折劵(my-cut)
      coupon: 0,
      vip_point: 0,
      hongbao: 0,
    },
    profile: {
      modProfileCount: 0,
      canMod: true,
    },
    userstate: {
      disModPsd: true,
    },
    // 推荐给用户的商品
    recommend: {
      page: 1,
      shops: [],
      have: true,
    },
    addressList: {
      address: [],
      current: {
        address: '当前暂未设置收货地址',
        id: -1,
      },
    },
    myCar: {
      shops: [],
      isEmpty: true,
      checkedAll: false,
      tprice: 0,
      tnum: 0,
    },
    myOrder: {
      orders: [],
    },
  },
  getters: {},
  mutations: {
    saveUser(state, value) {
      state.user = { ...state.user, ...value }
      state.isLogin = true
    },
    modUserAccount(state, value) {
      state.user.account = value
    },
    modProfile(state, pic_url) {
      state.user.userpic = pic_url
      state.profile.modProfileCount += 1
      if (state.profile.modProfileCount > 2) state.profile.canMod = false
    },
    unLockModPsd(state) {
      state.userstate.disModPsd = false
    },
    modInfo(state, info) {
      state.user.username = info.username
      state.user.phone = info.phone
      state.userstate.disModPsd = true
    },
    saveRecommend(state, items) {
      if (items.length < 8) state.recommend.have = false
      state.recommend.page += 1
      state.recommend.shops.push(...items)
      state.firstRecommend = false
    },
    stopRecommend(state) {
      state.recommend.have = false
    },
    saveAddress(state, items) {
      // 重构数据库中地址相关属性名
      items = JSON.parse(
        JSON.stringify(items)
          .replace(/receiptid/g, 'id')
          .replace(/phone/g, 'tel')
          .replace(/def/g, 'isDefault')
      )
      state.addressList.address = []
      state.addressList.address.push(...items)
      // 添加进默认地址
      items.some((item) => {
        if (item.isDefault) return (state.addressList.current = item)
      })
    },
    modAddress(state, data) {
      state.addressList.address.some((item) => {
        if (item.id == data.id) {
          if (!item.isDefault && data.isDefault)
            state.addressList.address.forEach((i) => (i.isDefault = 0))
          return Object.assign(item, data)
        }
      })
      if (data.id == state.addressList.current.id)
        Object.assign(state.addressList.current, data)
    },
    delAddress(state, receiptid) {
      let index = -1
      state.addressList.address.some((item, i) => {
        if (item.id == receiptid) return (index = i)
      })
      state.addressList.address.splice(index, 1)
      if (receiptid == state.addressList.current.id) {
        state.addressList.current.id = -1
        state.addressList.current.area = '当前暂未设置收货地址'
        state.addressList.current.address = '当前暂未设置收货地址'
      }
    },
    saveCars(state, items) {
      state.firstGetCar = false
      state.myCar.shops = []
      state.myCar.shops.push(...items)
      if (items.length > 0) state.myCar.isEmpty = false
      let list = items.filter((item) => item.checked)
      state.myCar.tnum = list.reduce((amt, i) => (amt += i.quantity), 0)
      state.myCar.checkedAll = list.length == items.length ? true : false
      state.myCar.tprice = list.reduce(
        (amt, item) => (amt += item.quantity * parseFloat(item.price)),
        0
      )
    },
    addToCar(state, product) {
      // 1.从推荐模块获取商品信息 2.检查该商品是否在购物车商品数组中
      // 3.在则修改购物车中该商品数量若选中则修改总价
      // 4.否则加入数组并手动修改总价,检查是否购物车非空
      // 5.修改总量
      let shop = {}
      state.recommend.shops.some((item) => {
        if (item.proid == product.proid) return (shop = item)
      })
      let flag = state.myCar.shops.some((item) => {
        if (item.proid == product.proid) {
          if (item.checked) {
            state.myCar.tprice += parseFloat(item.price)
            state.myCar.tnum += 1
          }
          return (item.quantity += 1)
        }
      })
      if (!flag) {
        shop = Object.assign(product, shop)
        state.myCar.tprice += parseFloat(shop.price)
        state.myCar.shops.push(shop)
        state.myCar.isEmpty = false
      }
      if (shop.checked) state.myCar.tnum += 1
    },
    delFromCar(state, proid) {
      let index = -1
      state.myCar.shops.some((item, i) => {
        if (item.proid == proid) {
          if (item.checked) {
            state.myCar.tprice -= parseFloat(item.price) * item.quantity
            state.myCar.tnum -= item.quantity
          }
          return (index = i)
        }
      })
      state.myCar.shops.splice(index, 1)
      if (state.myCar.shops.length == 0) state.myCar.isEmpty = true
    },
    modCarChecked(state, data) {
      let c = data.checked ? 1 : -1
      state.myCar.shops.some((item) => {
        if (item.proid == data.proid) {
          state.myCar.tprice += parseFloat(item.price) * item.quantity * c
          state.myCar.tnum += item.quantity * c
          return (item.checked = data.checked)
        }
      })
      if (state.myCar.shops.every((item) => item.checked))
        state.myCar.checkedAll = true
      else state.myCar.checkedAll = false
    },
    modCarCheckedAll(state, value) {
      state.myCar.tprice = value
        ? state.myCar.shops.reduce(
            (amt, item) => (amt += item.quantity * parseFloat(item.price)),
            0
          )
        : 0
      state.myCar.tnum = value
        ? state.myCar.shops.reduce((amt, i) => (amt += i.quantity), 0)
        : 0
      state.myCar.shops.forEach((item) => (item.checked = value))
    },
    modCarNum(state, data) {
      // 1.找到当前商品信息 2.检查是否选中(若选中:计算出商品数量差值c,修改总价) 3.更新仓库中商品数量
      let c = data.quantity + data.typeN
      state.myCar.shops.some((item) => {
        if (item.proid == data.proid) {
          if (item.checked) {
            c -= item.quantity
            state.myCar.tprice += parseFloat(item.price) * c
            state.myCar.tnum += c
          }
          return (item.quantity = data.quantity + data.typeN)
        }
      })
    },
    saveOrders(state, orders) {
      state.myOrder.orders = []
      state.firstGetOrders = false
      state.myOrder.orders.push(...orders)
    },
    addOrders(state, neworder) {
      // console.log(neworder)
      state.myOrder.orders.unshift(neworder)
    },
  },
  actions: {},
}
