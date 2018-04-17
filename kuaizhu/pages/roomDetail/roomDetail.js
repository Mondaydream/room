// pages/roomDetail/roomDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomId:'',
    ballOpacity: 8,
    ballBottom: 20,
    ballRight: 20,
    movies: [
      { url: 'https://z0.muscache.cn/im/pictures/c77363f9-c2c3-44fb-87bd-fde8cf9ca15c.jpg?aki_policy=xx_large' },
      { url: 'https://z0.muscache.cn/im/pictures/b204c0c3-e551-4479-806f-11a5205d8764.jpg?aki_policy=x_large' },
      { url: 'https://z0.muscache.cn/im/pictures/fa8b3cb1-fe15-46be-82f9-70a58daf422c.jpg?aki_policy=x_large' },
      { url: 'https://z0.muscache.cn/im/pictures/2399b087-6696-4f09-83bd-6fc9031620c9.jpg?aki_policy=x_large' },
      { url: 'https://z0.muscache.cn/im/pictures/cdfe4926-04d2-40dc-895a-5b3a910207a7.jpg?aki_policy=x_large' }
    ],

    tags: [
      { tag: '精选房源' },
      { tag: '品牌公寓' },
      { tag: '整租' },
      { tag: '3房2厅' },
      { tag: '电梯' },
      { tag: '靠近地铁' },
      { tag: '首租' },
      { tag: '临近公园' },
      { tag: '临近公园' }, 
      { tag: '临近公园' },
      { tag: '临近公园' },
      { tag: '临近公园' },
      { tag: '临近公园' },
      { tag: '临近公园' },

    ],
    roomData:{},
    swiperCurrent: 0,
    perCounts:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://www.kzroom.club/v1/queryRoom?roomID=' + options.roomId,
      success: function (res) {
        console.log(res.data.result[0])
        that.setData({
          roomData : res.data.result[0],
          perCounts: res.data.result[0].images.length,
        })
        
        wx.setNavigationBarTitle({
          title: that.data.roomData.title//页面标题为路由参数
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
      this.setData({
       
        roomId : options.roomId,
        perCounts : this.data.movies.length,
      });
      
      
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
  swiperChange: function (e) {
    //只要把切换后当前的index传给<swiper>组件的current属性即可
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  add:function(){
    var that = this
    wx.makePhoneCall({
      phoneNumber: that.data.roomData.phoneNumber //仅为示例，并非真实的电话号码
    })
  },
  share: function() {
    var that = this;
    let url = 'pages/share/share?shareID=' + this.data.roomData.shareID;
    wx.navigateTo({
      url: url,
    })
  },
  onShareAppMessage: function (res) {
    
    let url = 'pages/index/index?roomID=' + this.data.roomData.roomId
    
    return {
      title: this.data.roomData.title ,
      path: url,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})