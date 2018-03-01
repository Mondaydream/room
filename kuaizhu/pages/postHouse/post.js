var Util = require( '../../utils/util.js' )

var uploadFn = require( '../../utils/upload.js' )

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
    roomTypes:[
      {
        "type":"整租",
        "select":1,
      },
      {
        "type":"合租",
        "select":2,
      },
    ],
    roomTypeSelected:0,

    roomTags:[
        {
          "tag":"安静",
          "select":false,
        },
        {
          "tag": "首租",
          "select":false,
        }, {
          "tag": "单间",
          "select":false,
        }, {
          "tag": "电梯房",
          "select":false,
        }, {
          "tag": "近地铁",
          "select":false,
        }, {
          "tag": "家具齐全",
          "select":false,
        }, {
          "tag": "室友nice",
          "select":false,
        }, {
          "tag": "设施完善",
          "select":false,
        }, {
          "tag": "清新",
          "select":false,
        },
      ],

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

  //选择整租还是合租
  chooseCatalog: function (data) {
    var that = this;
    that.setData({//把选中值放入判断值
      roomTypeSelected: data.currentTarget.dataset.select
    })
    },
    //选择tag
  chooseTag: function (data) {
    var that = this;
    that.data.roomTags[data.currentTarget.dataset.select].select = !that.data.roomTags[data.currentTarget.dataset.select].select
    that.setData({//把选中值放入判断值
      roomTags: that.data.roomTags
    })
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
        // 获取文件路径
        var filePath = res.tempFilePaths[0];

        // 获取文件名
        var fileName = filePath.match(/(wxfile:\/\/)(.+)/)
        // fileName = fileName[2]

        // 文件上传cos
        uploadFn(filePath, "haodela")
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
    
   
  }
})