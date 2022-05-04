import $http from '@/utils/request'

// 获取用户所有订单号
const reqGetOrderId = (userid) =>
  $http({ method: 'post', url: '/order/getorderid', data: { userid } })
// 获取每个订单号下商品信息
const reqGetOrderDetail = (data) =>
  $http({ method: 'post', data, url: '/order/getorders' })
// 添加至订单表
const reqAddOrder = (data) => $http({ method: 'post', url: '/order/add', data })

// 添加至订单详情表
const reqAddOrderItem = (data) =>
  $http({ method: 'post', url: '/order/additem', data })

export default {
  reqGetOrderId,
  reqGetOrderDetail,
  reqAddOrder,
  reqAddOrderItem,
}
