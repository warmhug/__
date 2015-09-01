/**
 *  Widget 模块，ui组件的抽象类
 *  提供ui组件的统一生命周期管理
 * 
 */

function Widget () {
  this.ele = null
}  
Widget.prototype = {
  on: function (type, handler) {
    if (this.handlers[type] == undefined) {
      this.handlers[type] = []
    }
    this.handlers[type].push(handler)
    return this
  },
  fire: function (type, data) {
    if (Array.isArray(this.handlers[type])) {
      this.handlers[type].forEach(function (handler) {
        handler(data)
      })
    }
  },
  off: function (type) {
    if (type) {

    }
  },
  render: function (container) {
    this.renderUI()
    this.handlers = {} 
    this.bindUI()
    this.syncUI()
    $(container || document.body).append(this.ele)
  },
  //由子类具体实现
  //画ui界面
  renderUI: function () {},
  //由子类具体实现
  //为UI绑定dom事件，及组件的自定义事件
  bindUI: function () {},
  //由子类具体实现
  //根据config设置ui动态变化的部分，如宽、高、样式名等
  syncUI: function () {},
  destroy: function () {
    this.destructor()
    this.ele.off()
    this.ele.remove()
  },
  //由子类具体实现
  destructor: function () {}
}
Widget.prototype.constructor = Widget