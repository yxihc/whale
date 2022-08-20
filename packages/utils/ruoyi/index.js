import { parseTime } from './ruoyi'
import { decryptCBC } from '@/utils/sm4'

/**
 * 表格时间格式化
 */
export function formatDate(cellValue) {
  if (cellValue == null || cellValue == '') return ''
  const date = new Date(cellValue)
  const year = date.getFullYear()
  const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str) {
  // returns the byte length of an utf8 string
  let s = str.length
  for (let i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xDC00 && code <= 0xDFFF) i--
  }
  return s
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

/**
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

/**
 * check null or empty
 * @param {object} obj
 */
export function isNull(obj) {
  return obj === undefined || obj === null || obj === '' || obj.length === 0
}

/**
 * hide phone num
 * @param {string} input
 */
export function hidePhoneNum(input) {
  const s = decryptCBC(input)
  if (isNull(s)) return ''
  else if (s.length === 11) {
    return s.substr(0, 3) + '****' + s.substr(7, 4)
  } else return s
}

/**
 * hide idCard num
 * @param {string} input
 */
export function hideIdCardNum(input) {
  const s = decryptCBC(input)
  if (isNull(s)) return ''
  else if (s.length >= 14) {
    return s.substr(0, 6) + '******' + s.substr(14, 4)
  } else return s
}

/**
 * generate birthday by input idCard
 * @param {string} val
 * @param {string} pattern
 */
export function getBirthdayByIdCard(val, pattern) {
  if (!val || val.length < 14) return null
  const str = val.substring(6, 14)
  const year = str.substring(0, 4)
  const month = str.substring(4, 6)
  const day = str.substring(6, 8)
  if (parseInt(year) < 1900 || parseInt(year) > new Date().getFullYear()) return null
  if (parseInt(month) > 12) return null
  if (parseInt(day) > 31) return null
  return parseTime(new Date(year + '-' + month + '-' + day), pattern)
}

/**
 * check null or empty
 * @param {string} key
 * @param {array} dicts
 * @param {string} nullstr
 */
export function getLabelByDict(key, dicts, nullstr) {
  nullstr = nullstr || '-无-'

  if (isNull(dicts)) return '字典未设置'
  if (isNull(key)) return nullstr

  const keys = key.toString().split(',')
  const resDicts = keys.map(item => {
    const res = dicts.find(dict => dict.value.toString() === item)
    if (isNull(res)) return '无匹配值(' + item + ')'
    else return res.label
  })

  if (isNull(resDicts)) return nullstr

  return resDicts.join(',')
}

/**
 * split date as start and end
 * @param {obj} data
 * @param {string} param
 * @param {string} start
 * @param {string} end
 */
export function splitDate(data, param, start, end, isAddTime = false) {
  if (isNull(data[param])) return
  if (typeof start === 'boolean') {
    isAddTime = start
    start = ''
  }
  if (isNull(start)) start = param + 'S'
  if (isNull(end)) end = param + 'E'
  data[start] = parseTime(data[param][0], '{y}-{m}-{d}')
  data[end] = parseTime(data[param][1], '{y}-{m}-{d}')
  if (isAddTime) {
    data[start] = data[start] + ' 00:00:00'
    data[end] = data[end] + ' 23:59:59'
  }
  // delete data[param]
}

/**
 * split date as start and end
 * @param {obj} data
 * @param {string} param
 * @param {string} start
 * @param {string} end
 */
export function splitDateTime(data, param, start, end) {
  if (isNull(data[param])) return
  if (isNull(start)) start = param + 'S'
  if (isNull(end)) end = param + 'E'
  data[start] = parseTime(data[param][0], '{y}-{m}-{d} {h}:{i}')
  data[end] = parseTime(data[param][1], '{y}-{m}-{d} {h}:{i}')
  // delete data[param]
}

/**
 * convert image url to base64 code
 * @param {string} url
 * @param {string} outputFormat
 */
export function convertImgToBase64(url, outputFormat) {
  return new Promise((resolve, reject) => {
    let canvas = document.createElement('CANVAS')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    img.crossOrigin = 'Anonymous'
    img.onload = function() {
      // 图片原始尺寸
      const originWidth = this.width
      const originHeight = this.height
      // 最大尺寸限制，可通过设置宽高来实现图片压缩程度
      const maxWidth = 1000
      const maxHeight = 700
      // 目标尺寸
      let targetWidth = originWidth
      let targetHeight = originHeight
      // 图片尺寸超过最大值的限制
      if (originWidth > maxWidth || originHeight > maxHeight) {
        if (originWidth / originHeight > maxWidth / maxHeight) {
          // 更宽，按照宽度限定尺寸
          targetWidth = maxWidth
          targetHeight = Math.round(maxWidth * (originHeight / originWidth))
        } else {
          targetHeight = maxHeight
          targetWidth = Math.round(maxHeight * (originWidth / originHeight))
        }
      }
      // canvas对图片进行缩放
      canvas.width = targetWidth
      canvas.height = targetHeight

      ctx.drawImage(img, 0, 0, targetWidth, targetHeight)
      const dataURL = canvas.toDataURL(outputFormat || 'image/png')
      resolve(dataURL)
      canvas = null
    }
    img.src = url
  })
}

/**
 * check image could load success
 * @param {string} src
 */
export function imageLoad(src) {
  return new Promise((resolve, reject) => {
    const ImgObj = new Image()
    ImgObj.src = src
    ImgObj.onload = (e) => {
      resolve(e)
    }
    ImgObj.onerror = (e) => {
      reject(e)
    }
  })
}

/**
 * set default avatar
 * @param {string} url
 */
export function checkAvatarUrl(url) {
  return new Promise(resolve => {
    imageLoad(url).then(_ => {
      resolve(url)
    }).catch(_ => {
      resolve(require('../assets/image/default/defaultAvatar.png'))
    })
  })
}

export function makeMap(str, expectsLowerCase) {
  const map = Object.create(null)
  const list = str.split(',')
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true
  }
  return expectsLowerCase
    ? val => map[val.toLowerCase()]
    : val => map[val]
}

export const exportDefault = 'export default '

export const beautifierConf = {
  html: {
    indent_size: '2',
    indent_char: ' ',
    max_preserve_newlines: '-1',
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: 'separate',
    brace_style: 'end-expand',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: false,
    end_with_newline: true,
    wrap_line_length: '110',
    indent_inner_html: true,
    comma_first: false,
    e4x: true,
    indent_empty_lines: true
  },
  js: {
    indent_size: '2',
    indent_char: ' ',
    max_preserve_newlines: '-1',
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: 'normal',
    brace_style: 'end-expand',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: true,
    end_with_newline: true,
    wrap_line_length: '110',
    indent_inner_html: true,
    comma_first: false,
    e4x: true,
    indent_empty_lines: true
  }
}

// 首字母大小
export function titleCase(str) {
  return str.replace(/( |^)[a-z]/g, L => L.toUpperCase())
}

// 下划转驼峰
export function camelCase(str) {
  return str.replace(/_[a-z]/g, str1 => str1.substr(-1).toUpperCase())
}

export function isNumberStr(str) {
  return /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g.test(str)
}

// 将数字（整数）转为汉字，从零到一亿亿，需要小数的可自行截取小数点后面的数字直接替换对应arr1的读法就行了
export function convertToChinaNum(num) {
  const arr1 = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  const arr2 = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万', '十', '百', '千', '亿']// 可继续追加更高位转换值
  if (!num || isNaN(num)) {
    return '零'
  }
  const english = num.toString().split('')
  let result = ''
  for (let i = 0; i < english.length; i++) {
    const des_i = english.length - 1 - i// 倒序排列设值
    result = arr2[i] + result
    const arr1_index = english[des_i]
    result = arr1[arr1_index] + result
  }
  // 将【零千、零百】换成【零】 【十零】换成【十】
  result = result.replace(/零(千|百|十)/g, '零').replace(/十零/g, '十')
  // 合并中间多个零为一个零
  result = result.replace(/零+/g, '零')
  // 将【零亿】换成【亿】【零万】换成【万】
  result = result.replace(/零亿/g, '亿').replace(/零万/g, '万')
  // 将【亿万】换成【亿】
  result = result.replace(/亿万/g, '亿')
  // 移除末尾的零
  result = result.replace(/零+$/, '')
  // 将【零一十】换成【零十】
  // result = result.replace(/零一十/g, '零十');//貌似正规读法是零一十
  // 将【一十】换成【十】
  result = result.replace(/^一十/g, '十')
  return result
}

export function dateChange(num = 1, date = false) {
  if (!date) {
    date = new Date()// 没有传入值时,默认是当前日期
    date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  }
  date += ' 00:00:00'// 设置为当天凌晨12点
  date = Date.parse(new Date(date)) / 1000// 转换为时间戳
  date += (86400) * num// 修改后的时间戳
  const newDate = new Date(parseInt(date) * 1000)// 转换为时间
  return newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate()
}

export function diffDate(date, diff) {
  if (typeof date === 'string' && date.match(/\d{4}(\-|\/)\d{2}\1\d{2} \d{2}\:\d{2}/)) {
    date = new Date(date)
  }
  return new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds()
    ) + diff
  )
}

/**
 * 检查身份证合法性
 * 函数参数必须是字符串，因为二代身份证号码是十八位，而在javascript中，十八位的数值会超出计算范围，造成不精确的结果，导致最后两位和计算的值不一致，从而该函数出现错误。
 * 详情查看javascript的数值范围
 * 返回值：
 *  0 - 检查通过
 *  501 - 格式错误
 *  502 - 校验不通过
 * @param {string} idcode
 */
export function checkIDCard(idcode) {
  // 格式的正则
  // 正则思路
  /*
  第一位不可能是0
  第二位到第六位可以是0-9
  第七位到第十位是年份，所以七八位为19或者20
  十一位和十二位是月份，这两位是01-12之间的数值
  十三位和十四位是日期，是从01-31之间的数值
  十五，十六，十七都是数字0-9
  十八位可能是数字0-9，也可能是X 330110202012170024
  */
  const str = decryptCBC(idcode)

  // const year = new Date().getFullYear()
  // const month = new Date().getMonth() + 1
  // const day = new Date().getDate()

  const idcard_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0-9]{2})([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/
  // 判断格式是否正确
  const format = idcard_patter.test(str)
  if (!format) return 501

  // 加权因子
  const weight_factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  // 校验码
  const check_code = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']

  const code = str + ''
  const last = str[17]// 最后一位

  const seventeen = code.substring(0, 17)

  // ISO 7064:1983.MOD 11-2
  // 判断最后一位校验码是否正确
  const arr = seventeen.split('')
  const len = arr.length
  let num = 0
  for (let i = 0; i < len; i++) {
    num = num + arr[i] * weight_factor[i]
  }

  // 获取余数
  const resisue = num % 11
  const last_no = check_code[resisue]

  if (last !== last_no) return 502

  // 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
  return 0
}

/**
 * 检查手机号码合法性
 * 返回值：
 *  0 - 检查通过
 *  500 - 未填
 *  501 - 格式错误
 * @param {string} phonenum
 */
export function checkPhoneNum(phonenum) {
  const str = decryptCBC(phonenum)

  if (isNull(phonenum) || isNull(str)) return 500

  const patter = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/
  // 判断格式是否正确
  const format = patter.test(str)
  if (!format) return 501

  // 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
  return 0
}

export function uuid() {
  const s = []
  const hexDigits = '0123456789abcdef'
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'

  return s.join('')
}

// 指定长度和基数
export function uuid2(len, radix) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  const uuid = []
  radix = radix || chars.length

  if (len) {
    // Compact form
    for (let i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
  } else {
    // rfc4122, version 4 form
    let r

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (let i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16
        uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
      }
    }
  }

  return uuid.join('')
}

// 获取url参数
export function getQueryVariable(variable) {
  const href = window.location.href
  const temp = href.indexOf('?') !== -1 ? href.split('?') : false
  if (temp) {
    const query = temp[temp.length - 1]
    const vars = query.split('&')
    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split('=')
      if (pair[0] === variable) { return pair[1] }
    }
  } else return (false)
}

// 获取全部url参数
export function getAllQueryVariable() {
  const href = window.location.href
  const temp = href.indexOf('?') !== -1 ? href.split('?') : false
  if (temp) {
    const query = temp[temp.length - 1]
    const vars = query.split('&')
    const res = {}
    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split('=')
      res[pair[0]] = pair[1]
    }
    return res
  } else return (false)
}
