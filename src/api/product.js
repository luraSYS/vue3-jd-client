// 导入封装好的axios
import $http from '@/utils/request'
// 获取模块商品
const reqProductPart = (part, page) =>
  $http({ url: `/product/${part}?page=${page}` })

// 获得推荐商品
const reqRecommend = (userid, page) =>
  $http({ url: `/product/recommend`, params: { userid, page } })

export default {
  reqProductPart,
  reqRecommend,
}
