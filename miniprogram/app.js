//app.js
App({
  onLaunch: function () {
    wx.cloud.init()
  },
  // 引入`towxml3.0`解析方法
	towxml:require('/towxml/index'),
})