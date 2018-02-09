//logs.js
const util = require('../../utils/util.js')
var app = getApp();
Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  onHide : function(){
    console.log("on hide");

  },
  onPullDownRefresh:function(){
    console.log("正在刷新")
  },
  onShow : function(){
    console.log(app.globalData.userInfo);
  }
})
