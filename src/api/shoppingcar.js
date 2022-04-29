import $http from '@/utils/request'

// 获取购物车信息
const reqGetShoppingCar = (userid) =>
  $http({ url: `/car/shoppingcar`, params: { userid } })

// 添加商品至购物车
const reqAddToCar = (data) => $http({ method: 'post', url: '/car/add', data })

// 商品移出购物车
const reqDelFromCar = (data) => $http({ method: 'post', url: '/car/del', data })
export default {
  reqGetShoppingCar,
  reqAddToCar,
  reqDelFromCar,
}
