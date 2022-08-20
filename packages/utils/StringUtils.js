function isString(str) {
    return (typeof str == 'string') && str.constructor == String;
}

function getQueryString(key) {
    return decodeURIComponent((new RegExp('[?|&]' + key + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || undefined;
}

function getWeekText(index) {
    var text = '';
    switch (index) {
        case "1":
            text = "周一"
            break;
        case "2":
            text = "周二"
            break;
        case "3":
            text = "周三"
            break;
        case "4":
            text = "周四"
            break;
        case "5":
            text = "周五"
            break;
        case "6":
            text = "周六"
            break;
        case "0":
            text = "周日"
            break;
    }
    return text

}
function tuominMobile(mobile) {

    var pat = /(\d{3})\d*(\d{4})/
    var b = mobile.replace(pat, '$1****$2');
    return b;
}


function tuominIDCard(idcard) {
    return idcard.replace(/^(.{4})(?:\w+)(.{4})$/, "$1********$2");
}



function containsNumber(str) {
    var reg=/\d/;
    return reg.test(str);
}


// 判断是否为纯数字，校验通过返回true
function isNum(val) {
    var reg = /^\d{1,}$/
    var pattern = new RegExp(reg);
    return pattern.test(val);
}

module.exports = {
    isString,
    getWeekText,
    getQueryString,
    tuominMobile,
    tuominIDCard,
    containsNumber,
    isNum
}