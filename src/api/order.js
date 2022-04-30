import $http from '@/utils/request'

// 获取用户所有订单号
const reqGetOrderId = (userid) =>
  $http({ method: 'post', url: '/order/getorderid', data: { userid } })
// 获取每个订单号下商品信息
const reqGetOrderDetail = (data) =>
  $http({ method: 'post', data, url: '/order/getorders' })

export default {
  reqGetOrderId,
  reqGetOrderDetail,
}
