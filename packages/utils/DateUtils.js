/**
 * 日期格式化
 * @param {Object} date format
 */
const dateFormat = function (date, format) {
    var o = {
        "M+": date.getMonth() + 1, //month
        "d+": date.getDate(), //day
        "h+": date.getHours(), //hour
        "m+": date.getMinutes(), //minute
        "s+": date.getSeconds(), //second
        "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
        "S": date.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
        (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1,
                RegExp.$1.length == 1 ? o[k] :
                    ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}

function getCurrentDate(formatStr) {
    let date = new Date();
    return dateFormat(date, formatStr)
}


/**
 * 比较2个日期的大小
 * @param {Object} startdate
 * @param {Object} enddate
 */
function compareDate(startdate, enddate) {
    var days = 0;
    if (enddate && enddate != "") {
        if (startdate == undefined || startdate == "") {
            startdate = new Date();
        } else {
            startdate = new Date(startdate.substr(0, 4), parseInt(startdate.substr(5, 2)) - 1, startdate.substr(8, 2));
        }
        enddate = new Date(enddate.substr(0, 4), parseInt(enddate.substr(5, 2)) - 1, enddate.substr(8, 2));
        var time = enddate.getTime() - startdate.getTime();
        if (time > 0) {
            return true
        } else {
            false
        }
    }
    return false;
}


function getCurrentDateTime() {
    let date = new Date();
    return date.getTime();
}

const dayTime = 3600 * 1000 * 24;

/**
 * 获取跟当前时间相差天数
 * @param {Object} date
 */
function getDifferDayWithDate(date, compareDate) {
    let nowTime = new Date().getTime();
    if (compareDate) {
        nowTime = new Date(compareDate).getTime();
    }
    let compareTime = new Date(date).getTime();

    let timeinterval = nowTime - compareTime;
    let day = timeinterval / dayTime;
    return parseInt(day);
}

/**
 * 获取距离当前日期天数之前或之后日期
 * @param {Object} date 当前日期 (yyyy-MM-dd)
 * @param {Object} day 天数
 * @param {Object} isBefore 之前
 */
function getDateWithDay(date, day, isBefore = true) {
    if (!date) {
        date = getCurrentDate('yyyy-MM-dd')
    }
    let timeinterval = '';
    let dateTime = new Date(date).getTime();
    if (isBefore) {
        timeinterval = dateTime - day * dayTime;
    } else {
        timeinterval = dateTime + day * dayTime;
    }
    let newDate = dateFormat(new Date(timeinterval), 'yyyy-MM-dd');
    return newDate;
}


function getWeekAndDay(time) {
    // DateUtils
    let day = getDifferDayWithDate(time)
    day = Math.abs(day);
    day = 279 - day
    let week = 0
    let dayNum = 0
    if (day > 279) {
        day = 279;
    } else if (day < 14) {
        day = 14;
    }
    if (day >= 279) {
        day = '41周以上';
    } else {
        week = parseInt(day / 7);
        dayNum = day % 7;
        day = parseInt(week) + '周' + (dayNum > 0 ? `+${dayNum}天` : '');
    }
    // console.log( day)
    // console.log( week)

    let info = {
        week: week,
        day: dayNum,
        result: day
    }
    return info
}


module.exports = {
    dateFormat: dateFormat,
    getCurrentDate: getCurrentDate,
    compareDate: compareDate,
    getTime: getCurrentDateTime,
    getDifferDayWithDate,
    getDateWithDay,
    getWeekAndDay
}
