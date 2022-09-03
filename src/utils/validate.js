import { telReg ,userReg, passwordReg } from "./regular";
import { debounce } from "./utils";
// import _ from 'lodash'
export default {
    validateTel:(rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入电话号码'));
        } else {
          if (!telReg.test(value)) {
            callback(new Error('请输入正确电话号码'));
          }
          callback();
        }
      },
       // 节流 定时器 + 时间戳
    throttle: function(func, delay) {
      var timer = null
      var startTime = Date.now()
      return function() {
        // 结束时间
        var curTime = Date.now()
        // 间隔时间 = 延迟的时间 - （结束时间戳 - 开始时间戳）
        var interval = delay - (curTime - startTime)
        var th = this
        var args = arguments
        clearTimeout(timer)
        if(interval <= 0) {
          // 证明可以触发了
          func.apply(th, args)
          // 重新计算开始时间
          startTime = Date.now()
        } else {
          // 继续等待
          timer = setTimeout(func, interval)
        }
      }
    },
    userNameValidate: debounce((rule, value, callback) => {
      if (!value || !value.trim()) {
        callback(new Error('请填写用户名'))
      }
      if (!userReg.test(value)) {
        callback(new Error('用户名限定在16个字符内，可包含中英文、数字或下划线！'))
      }
      callback()
    }, 500),
    passwordValidate: debounce((rule, value, callback) => {
      if (!value || !value.trim()) {
        callback(new Error('请填写密码'))
      }
      if (!passwordReg.test(value)) {
        callback(new Error('密码长度在6到16个字符内，包含中英文、数字和特殊字符！'))
      }
      callback()
    }, 500)
}