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
  return flag
}
export const checkphone = (val) => {
  let flag = /^1[3-9]\d{9}$/.test(val)
  if (!flag) Toast('请输入正确手机号')
  return flag
}

// 获取当前时间
export const getTime = (time) => {
  const date = new Date(time)
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()
  month = month >= 1 && month <= 9 ? '0' + month : month
  day = day >= 0 && day <= 9 ? '0' + day : day
  hour = hour >= 0 && hour <= 9 ? '0' + hour : hour
  minute = minute >= 0 && minute <= 9 ? '0' + minute : minute
  second = second >= 0 && second <= 9 ? '0' + second : second
  return `${date.getFullYear()}-${month}-${day} ${hour}:${minute}:${second}`
}
