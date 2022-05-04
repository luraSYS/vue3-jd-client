import $http from '@/utils/request'

// 获取用户收货地址
const reqAddress = (userid) =>
  $http({ method: 'post', url: '/address/getaddress', data: { userid } })

// 设置默认收货地址
const reqSetDefAddress = (data) =>
  $http({ method: 'post', url: '/address/setdef', data })

// 添加新的收货地址
const reqAddAddress = (data) =>
  $http({ method: 'post', url: '/address/add', data })
const reqAddAddress2 = (data) =>
  $http({ method: 'post', url: '/address/add2', data })

// 修改收货地址
const reqModAddress = (data, Aid, Uid) =>
  $http({
    method: 'post',
    url: `/address/mod?receiptid=${Aid}&userid=${Uid}`,
    data,
  })

// 删除收货地址
const reqDelAddress = (receiptid) =>
  $http({ method: 'post', url: 'address/remove', data: { receiptid } })
export default {
  reqAddress,
  reqSetDefAddress,
  reqAddAddress,
  reqModAddress,
  reqAddAddress2,
  reqDelAddress,
}
