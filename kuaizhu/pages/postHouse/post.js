var Util = require( '../../utils/util.js' )

var uploadFn = require( '../../utils/upload.js' )

var imageURLHead = "https://kuaizhu-1255976527.cos.ap-guangzhou.myqcloud.com/"


// pages/postHouse/post.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pictures:[
       { "url": true },
      
    ],
    uploadedPics:[],
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
    postData:{
      "title":"",
      "RentalProperties":[],
      "rentPrice":"",
      "roomDescription":"",
      "coverImgUrl":"",
      "images":[],
      "phoneNumber":"",
      "releseTime":"",
      "city":"广州",
    },

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getUserInfo({
     
      success: function (data) {
        var encryptedData = data.encryptedData;
        var iv = data.iv;

        var userInfo = data.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女 
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country

        console.log("这个字典：",userInfo)
      }
    })
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

  bindRoomTitle:function(e){
    var that = this
    that.data.postData.title = e.detail.value
    this.setData({
      postData:that.data.postData
    })
    
  },

  bindPrice:function(e){
    var that = this
    that.data.postData.rentPrice = e.detail.value
    this.setData({
      postData:that.data.postData
    })
  },

  bindDes : function(e){
    var that = this
    that.data.postData.roomDescription = e.detail.value
    this.setData({
      postData: that.data.postData
    })
  },

  binphone : function(e){
    var that = this
    var that = this
    that.data.postData.phoneNumber = e.detail.value
    this.setData({
      postData: that.data.postData
    })
    console.log("电话号码", that.data.postData)
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
    var that = this
    var length = that.data.pictures.length - 1
    console.log("点击了上传房源",length)
    for(var i = 0;i < length;i++){
        var item = that.data.pictures[i]
        var filePath = item
        console.log("url:",filePath)
        var fileName = filePath.match(/(wxfile:\/\/)(.+)/)
        fileName = fileName[2]
        wx.showLoading({
          title: '正在上传房源信息',
        })
        uploadFn(filePath, fileName, function (res) {
          //res就是我们请求接口返回的数据
          console.log("上传图片成功：",res)
          var fileURL = imageURLHead + fileName
          that.data.uploadedPics.push(fileURL)
          if (that.data.uploadedPics.length == that.data.pictures.length - 1){
              that.postHouseInfo()
          }
        }, function () {
          wx.showToast({
            title: '上传图片失败',
          })
        })
    }
  },
  postHouseInfo: function () {
    var that = this
    var RentalProperties = []
    if (that.data.roomTypeSelected == 1){
      RentalProperties.push("整租")
    }
    if (that.data.roomTypeSelected == 2){
      RentalProperties.push("合租")
    }
    console.log("roomTags:", that.data.roomTags)
   

    for (var i = 0; i < that.data.roomTags.length;i++){
      var item = that.data.roomTags[i]
      if (item.select == true) {
        RentalProperties.push(item.tag)
      }
    }

    that.data.postData.RentalProperties = RentalProperties
   
    that.data.postData.images = that.data.uploadedPics

    that.data.postData.coverImgUrl = that.data.uploadedPics[0]
    
    that.data.postData.releseTime = Util.formatTime(new Date())

    that.setData({
      postData: that.data.postData
    })
    
    var jsonStr = JSON.stringify(that.data.postData)
    console.log("上传的json字符串:",jsonStr)
    wx.request({
      url: "https://www.kzroom.club/uploadRoom",
      header: {
        "Content-Type": "application/json"
      },
      method: "POST",
      
      data:jsonStr,
      complete: function (res) {
        that.setData({
          
        });
        if (res == null || res.data == null) {
          console.error('网络请求失败');
          return;
        }else{

          console.log("上传成功:",res);
          wx.hideLoading()
          wx.navigateBack()
        }
      }
    })  
  }
})
 
  