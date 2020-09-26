export const type = (data) => {
    // eslint-disable-next-line no-undef
    if (arguments.length === 0) return new Error('type方法未传参');
    var typeStr = Object.prototype.toString.call(data);
    return typeStr.match(/\[object (.*?)\]/)[1].toLowerCase();
}

/**
 * 防抖
 * @param {Function} fn 待调用函数
 * @param {Number} delay 空闲时间（毫秒）
 */
export const debounce = (fn, delay) => {
    let timer = null
    return function () {
        clearTimeout(timer)
        let context = this
        let args = arguments
        timer = setTimeout(() => {
            fn.apply(context, args)
        }, delay)
    }
}

export const groupBy = (list, key) => {
    return list.reduce((rv, x) => {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
}