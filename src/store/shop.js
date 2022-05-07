export default {
  namespaced: true,
  state: {
    firstHome: true,
    currentRoute: 0,
    partName: ['boutique', 'hot', 'promotion'],
    partTitle: ['精品推荐', '热门商品', '活动商品'],
    partDesc: [
      '最新商品推荐，满足您对新商品的追求',
      '热门商品，火热促销中',
      '特价大耍卖，等着您的到来',
    ],
    homeIconNav: [
      '超市',
      '数码电器',
      '服饰',
      '生鲜',
      '上门服务',
      '充值缴费',
      '物流查询',
      '领劵',
      '领津贴',
      '会员',
    ],
    boutique: {
      shops: [],
      have: true,
    },
    hot: {
      shops: [],
      have: true,
    },
    promotion: {
      shops: [],
      have: true,
    },
    digital: {
      title: '数码产品',
      descTitle: '满足您视觉听觉的盛宴',
      shops: [],
      have: true,
      iconName: ['小米', '华为', '荣耀', 'iPhone', 'vivo', 'OPPO', '魅族'],
      iconName2: [
        '轻薄本',
        '游戏本',
        '机械键盘',
        '组装电脑',
        '移动硬盘',
        '显卡',
        '游戏台式机',
      ],
    },
    books: {
      title: '精品图书',
      descTitle: '海量图书，任君挑选',
      shops: [],
      have: true,
      iconName: [
        '小说',
        '动漫/幽默',
        '文学',
        '艺术',
        '传记',
        '法律',
        '历史',
        '政治',
      ],
    },
    cloths: {
      title: '时尚穿搭',
      descTitle: '潮流时尚，天下谁人不羡君',
      shops: [],
      have: true,
      iconName: [
        '短袖T恤',
        '长袖T恤',
        'POLO恤',
        '衬衫',
        '雪纺衫',
        '蕾丝衫',
        '毛衣',
        '针织衫',
      ],
      iconName2: [
        '欧美风',
        '甜美风',
        '学院风',
        '小香风',
        '绅士风',
        '中二风',
        '大牌风',
      ],
    },
    food: {
      title: '美食甜品',
      descTitle: '新鲜可口，供君体验舌尖上的满足',
      shops: [],
      have: true,
      iconName: [
        '进口牛奶',
        '进口酸奶',
        '核桃',
        '碧根果',
        '红枣',
        '牛肉干',
        '棒棒糖',
        '肉松饼',
      ],
    },
    device: {
      title: '家用电器',
      descTitle: '省时省力，您的居家必备好伙伴',
      shops: [],
      have: true,
      iconName: [
        '洗衣机',
        '冰柜',
        '车载冷热箱',
        '冷柜',
        '酒柜',
        '空调',
        '净水器',
      ],
    },
    // 当前商品信息
    current: {
      have: false,
      info: [],
      pics: [],
    },
  },
  getters: {},
  mutations: {
    saveProduct(state, pro) {
      state.firstHome = false
      if (pro.data.length < 8) state[pro.part].have = false
      state[pro.part].shops.push(...pro.data)
    },
    stopProduct(state, part) {
      state[part].have = false
    },
    saveCurrentShop(state, pro) {
      pro.price = parseFloat(pro.price)
      pro.yprice = (parseFloat(pro.price) * 1.2).toFixed(2)
      state.current.have = true
      state.current.info = pro
      state.current.pics = Object.values(pro).filter((i) => /^http/.test(i))
    },
    modCurrentRoute(state, path) {
      if (path == '/home') state.currentRoute = 0
      if (path == '/category') state.currentRoute = 1
      if (path == '/address') state.currentRoute = 2
      if (path == '/car') state.currentRoute = 3
      if (path == '/mine') state.currentRoute = 4
    },
  },
  actions: {},
}
