import { Toast } from 'vant'
// 用户名信息校验校验
export const checkname = (val) => {
  let flag = /^[\S]{4,12}$/.test(val)
  if (!flag) Toast('用户名必须4到20位，且不能出现空格')
  return flag
}
export const checkpsd = (val) => {
  let flag = /^[\S]{3,12}$/.test(val)
  if (!flag) Toast('密码必须3到20位，且不能出现空格')
}
export const checkphone = (val) => {
  let flag = /^1[3-9]\d{9}$/.test(val)
  if (!flag) Toast('请输入正确手机号')
  return flag
}
