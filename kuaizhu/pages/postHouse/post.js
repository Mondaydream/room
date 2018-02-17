var Util = require( '../../utils/util.js' );

// pages/postHouse/post.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pictures:[
       { url: true },
      
    ],
    seletedList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  },
  bindViewTap: function () {
    var that = this;
    
    var pictures = that.data.pictures;
    console.log(pictures);
    wx.chooseImage({
      // 设置最多可以选择的图片张数，默认9,如果我们设置了多张,那么接收时//就不在是单个变量了,
      count: 9,
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        // 获取成功,将获取到的地址赋值给临时变量
        var tempFilePaths = res.tempFilePaths;
        pictures = tempFilePaths.concat(pictures);
        console.log(pictures);
        console.log(tempFilePaths);
        that.setData({
          //将临时变量赋值给已经在data中定义好的变量
          pictures: pictures,
          seletedList : tempFilePaths
        })
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },
  previewImage: function (e) {
    console.log(e)
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.seletedList
    })
  },
  add: function () {
    
    wx.request({
      url: "http://op.juhe.cn/onebox/weather/query",
      header: {
        //请求头和ajax写法一样
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: Util.json2Form({ cityname: "北京", key: "1430ec127e097e1113259c5e1be1ba70" }),
      complete: function (res) {

        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })

        that.setData({
          red: 'red',
          city_name: res.data.result.data.realtime.city_name,
          date: res.data.result.data.realtime.date,
          info: res.data.result.data.realtime.weather.info,
        });
        if (res == null || res.data == null) {
          console.error('网络请求失败');
          return;
        }

        setTimeout(function () {
          wx.hideToast()
        }, 2000)
      }
    })
  }
})