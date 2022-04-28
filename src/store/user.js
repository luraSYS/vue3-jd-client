export default {
  namespaced: true,
  state: {
    isLogin: false,
    visitedAddress: false,
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
    },
  },
  getters: {},
  mutations: {
    saveUser(state, value) {
      state.user = { ...state.user, ...value }
      state.isLogin = true
    },
    saveRecommend(state, items) {
      if (items.length < 8) state.recommend.have = false
      state.recommend.page += 1
      state.recommend.shops.push(...items)
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
      // 改购物车visitedAddress为true(第二次不再发请求)
      state.visitedAddress = true
    },
    modAddress(state) {
      state.visitedAddress = false
    },
    saveCars(state, items) {
      state.myCar.shops = []
      state.myCar.shops.push(...items)
      if (items.length > 0) state.myCar.isEmpty = false
      let list = items.filter((item) => item.checked)
      state.myCar.checkedAll = list.length == items.length ? true : false
      state.myCar.tprice = list.reduce(
        (amt, item) => (amt += item.quantity * parseFloat(item.price)),
        0
      )
    },
    modCarChecked(state, data) {
      let c = data.checked ? 1 : -1
      state.myCar.shops.some((item) => {
        if (item.proid == data.proid) {
          state.myCar.tprice += parseFloat(item.price) * item.quantity * c
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
      state.myCar.shops.forEach((item) => (item.checked = value))
    },
  },
  actions: {},
}