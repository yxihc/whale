import { parseTime } from './ruoyi'
import { getWeekNumber } from 'element-ui'

export function dateChange(num, date) {
  if (!date) {
    // date = parseTime(new Date(), '{y}-{m}-{d}')// 没有传入值时,默认是当前日期
    date = new Date()// 没有传入值时,默认是当前日期
    date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  }
  date += ' 00:00:00'// 设置为当天凌晨12点
  date = Date.parse(new Date(date)) / 1000// 转换为时间戳
  date += (86400) * num// 修改后的时间戳
  const newDate = new Date(parseInt(date) * 1000)// 转换为时间
  return parseTime(newDate, '{y}-{m}-{d}')
}

export function GetNumberOfDays(date1, date2) {
  // 获得天数
  // date1：开始日期，date2结束日期
  const a1 = Date.parse(new Date(date1))
  const a2 = Date.parse(new Date(date2))
  return parseInt((a2 - a1) / (1000 * 60 * 60 * 24))// 核心：时间戳相减，然后除以天数
}

export function dateCompare(date1, date2) {
  // 获得天数
  // date1：开始日期，date2结束日期
  const a1 = new Date(date1)
  const a2 = new Date(date2)

  if (a1 > a2) return 1
  else if (a1 === a2) return 0
  else return -1
}

export function getAgeByBirthday(birthday) {
  const a1 = Date.parse(new Date(birthday))
  const a2 = Date.parse(new Date())

  return Math.round((a2 - a1) / (1000 * 60 * 60 * 24 * 365))
}

export function getAgeByIdcard(idcard) {
  if (idcard.length < 14) return null
  const str = idcard.substring(6, 14)
  const year = str.substring(0, 4)
  const month = str.substring(4, 6)
  const day = str.substring(6, 8)
  if (parseInt(year) < 1900 || parseInt(month) > 12 || parseInt(day) > 31) return null

  const a1 = Date.parse(new Date(year + '-' + month + '-' + day))
  const a2 = Date.parse(new Date())

  return Math.round((a2 - a1) / (1000 * 60 * 60 * 24 * 365))
}

export function getWeekDay(date) {
  const weekList = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  return weekList[date.getDay()]
}
