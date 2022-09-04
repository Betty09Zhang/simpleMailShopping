export const prefix = (url) => {
    if (url && url.startsWith('http')) {
      return url
    } else {
      url = `http://backend-api-01.newbee.ltd${url}`
      return url
    }
  }

export const fixed = (value) => {
  return value && value.toFixed(2)
}
  // 函数防抖,n秒内又触发事件，并重新计算执行时间
export function debounce(fn, delay) {
  // 记录上一次的延时器
  var timer = null;
  delay = delay || 300;
  return function() {
    var args = arguments;
    var that = this;
    // 清除上一次延时器
    clearTimeout(timer)
    timer = setTimeout(function() {
        fn.apply(that,args)
        args = []
    }, delay);
  }
}

/**
 * 节流，在持续触发事件的过程中，n 秒只执行一次
 */
export function throttle(fn, wait) {
  let timeout;
  return function() {
    let _this= this;
    let args = arguments
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null,
        fn.apply(_this, args)
      },wait)
    }
  }

}

/**
 * 
 * @param {节流函数 ，可以传参} fn 
 * @param {*} delay 
 * @returns 
 */
export function throtte(fn, delay) {
  let timer
  return function () {
    let _this = this
    let args = arguments
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(_this, args)
        clearTimeout(timer)
      }, delay)
    }
  }  
}