import $http from '@/utils/request'

const reqGetShoppingCar = (userid) =>
  $http({ url: `/car/shoppingcar`, params: { userid } })

export default {
  reqGetShoppingCar,
}
