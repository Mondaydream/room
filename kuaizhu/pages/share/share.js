// share.js
var utils = require("../../utils/util.js");
var Promise = require('../../utils/es6-promise.min.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarURL: 'https://www.baidu.com/img/bd_logo1.png?qua=high&where=super',
    userName: 'x',
    userQuote: 'y',
    previewImages: ['https://www.baidu.com/img/bd_logo1.png?qua=high&where=super'],
    houseTitle: 'text',
    housePrice: 'text',
    qrcodeImageURL: 'https://www.baidu.com/img/bd_logo1.png?qua=high&where=super'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
    var that = this;
    var shareID = options.shareID;

    const wxGetImageInfo = utils.wxPromisify(wx.getImageInfo)
   
    Promise.all([
      wxGetImageInfo({
        src: 'https://kuaizhu-1255976527.cos.ap-guangzhou.myqcloud.com/Oval.png'
      }),
      wxGetImageInfo({
        src: 'https://kuaizhu-1255976527.cos.ap-guangzhou.myqcloud.com/Oval.png'
      })
    ]).then(res => {
      const ctx = wx.createCanvasContext('shareCanvas')

      // 底图
      ctx.drawImage(res[0].path, 0, 0, 600, 900)

      // 作者名称
     
      // 小程序码
      const qrImgSize = 180
      ctx.drawImage(res[1].path, 100, 100, qrImgSize, qrImgSize)
      ctx.setTextAlign('center')    // 文字居中
      ctx.setFillStyle('#000000')  // 文字颜色：黑色
      ctx.setFontSize(22)         // 文字字号：22px
      ctx.fillText("快住的分享图", 100, 100)


      ctx.stroke()
      ctx.draw()
    })


    // wx.getImageInfo({
    //   src: 'https://kuaizhu-1255976527.cos.ap-guangzhou.myqcloud.com/Oval.png',
    //   success:function(res){
    //     const ctx = wx.createCanvasContext('shareCanvas')

    //     // 底图
    //     ctx.drawImage(res.path, 0, 0, 600, 900)
    //     ctx.setTextAlign('center')    // 文字居中
    //     ctx.setFillStyle('#000000')  // 文字颜色：黑色
    //     ctx.setFontSize(22)         // 文字字号：22px
    //     ctx.fillText("作者：快住租房", 100, 500)
    //     // 作者名称
    //     ctx.stroke()
    //     ctx.draw()
    //   }
    // })
    // wx.getImageInfo({
    //   src: 'https://kuaizhu-1255976527.cos.ap-guangzhou.myqcloud.com/Oval.png',
    //   success:function(res){
    //     const ctx = wx.createCanvasContext('shareCanvas')
    //     // 小程序码
    //     const qrImgSize = 180
    //     ctx.drawImage(res.path,  100, 300, 100, 200)
    //     ctx.setTextAlign('center')    // 文字居中
    //     ctx.setFillStyle('#000000')  // 文字颜色：黑色
    //     ctx.setFontSize(22)         // 文字字号：22px
    //     ctx.fillText("作者：快住租房xxxxx", 100, 500)
    //     ctx.stroke()
    //     ctx.draw()
    //   }
    // })
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  
  }



  
})

