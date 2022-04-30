// 导入封装好的axios
import $http from '@/utils/request'
// 获取模块商品
const reqProductPart = (part, page) =>
  $http({ url: `/product/${part}?page=${page}` })

// 获得推荐商品
const reqRecommend = (userid, page) =>
  $http({ url: `/product/recommend`, params: { userid, page } })

// 获取商品详细信息
const reqProductDetail = (proid) =>
  $http({ url: '/product/detail', params: { proid } })
export default {
  reqProductPart,
  reqRecommend,
  reqProductDetail,
}
