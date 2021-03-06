//index.js
//获取应用实例
var app = getApp()
var Loger = require("../../utils/Loger.js");

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    comeon:"frist code!",

    ballOpacity:8,
    ballBottom:20,
    ballRight:20,
    ballBottomTwo:75,
    
    showModalStatus: false,
    phone:'',

    pageData:[
      {"id":'1',
       "title":'一号房间',
       "rentTags":'整租|三室两厅|地铁三分钟|高层',
       'opertionTags':'精选房源',
       "image":'https://pic3.zhimg.com/v2-636c343b5bc8af83ece750972826957e_r.jpg'
      },
      {
        "id": '2',
        "title": '二号房间',
        "rentTags": '整租|三室两厅|地铁三分钟|高层',
        'opertionTags': '精选房源',
        "image": 'https://pic3.zhimg.com/v2-636c343b5bc8af83ece750972826957e_r.jpg'
      }, {
        "id": '3',
        "title": '三号房间',
        "rentTags": '整租|三室两厅|地铁三分钟|高层',
        'opertionTags': '精选房源',
        "image": 'https://pic3.zhimg.com/v2-636c343b5bc8af83ece750972826957e_r.jpg'
      }, {
        "id": '4',
        "title": '四号房间',
        "rentTags": '整租|三室两厅|地铁三分钟|高层',
        'opertionTags': '精选房源',
        "image": 'https://pic3.zhimg.com/v2-636c343b5bc8af83ece750972826957e_r.jpg'
      }, {
        "id": '5',
        "title": '五号房间',
        "rentTags": '整租|三室两厅|地铁三分钟|高层',
        'opertionTags': '精选房源',
        "image": 'https://pic3.zhimg.com/v2-636c343b5bc8af83ece750972826957e_r.jpg'
      }, {
        "id": '6',
        "title": '六号房间',
        "rentTags": '整租|三室两厅|地铁三分钟|高层',
        'opertionTags': '精选房源',
        "image": 'https://pic3.zhimg.com/v2-636c343b5bc8af83ece750972826957e_r.jpg'
      }, {
        "id": '7',
        "title": '七号房间',
        "rentTags": '整租|三室两厅|地铁三分钟|高层',
        'opertionTags': '精选房源',
        "image": 'https://pic3.zhimg.com/v2-636c343b5bc8af83ece750972826957e_r.jpg'
      }, {
        "id": '8',
        "title": '三号房间',
        "rentTags": '整租|三室两厅|地铁三分钟|高层',
        'opertionTags': '精选房源',
        "image": 'https://pic3.zhimg.com/v2-636c343b5bc8af83ece750972826957e_r.jpg'
      },{
        "id": '9',
        "title": '三号房间',
        "rentTags": '整租|三室两厅|地铁三分钟|高层',
        'opertionTags': '精选房源',
        "image": 'https://pic3.zhimg.com/v2-636c343b5bc8af83ece750972826957e_r.jpg'
      },{
        "id": '10',
        "title": '三号房间',
        "rentTags": '整租|三室两厅|地铁三分钟|高层',
        'opertionTags': '精选房源',
        "image": 'https://pic3.zhimg.com/v2-636c343b5bc8af83ece750972826957e_r.jpg'
      },{
        "id": '11',
        "title": '三号房间',
        "rentTags": '整租|三室两厅|地铁三分钟|高层',
        'opertionTags': '精选房源',
        "image": 'https://pic3.zhimg.com/v2-636c343b5bc8af83ece750972826957e_r.jpg'
      }, {
        "id": '12',
        "title": '三号房间',
        "rentTags": '整租|三室两厅|地铁三分钟|高层',
        'opertionTags': '精选房源',
        "image": 'https://pic3.zhimg.com/v2-636c343b5bc8af83ece750972826957e_r.jpg'
      }

    ],
  },
  
  // //事件处理函数
  // bindViewTap: function() {
  //  var ture = wx.navigateTo({
  //     url: '../logs/logs',
  //   })
  //   console.log(ture);
   
  // },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShow:function(){
    app.globalData.userInfo = "Chris";
    Loger.PrintLog("index on show");
  },
  ballClickEvent: function () {
    console.log("点击了下面");
  },
  ballClickEventTwo: function () {
    console.log("点击了上面");
  },

  powerDrawer: function (e) {
    console.log('点击了弹窗按钮');
    var phone = this.data.phone;
    console.log(phone);
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
    wx.navigateTo({
      url: '../postHouse/post',
    })
  },

  binphone: function (e) {
    this.setData({
      phone:e.detail.value
    });
    // console.log(e.detail.value)
  },

  binpassword: function (e) {
    console.log(e.detail.value)
  },

  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({
      duration: 200,  //动画时长  
      timingFunction: "ease", //线性  
      delay: 0  //0则不延迟  
    });
    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;
    // 第3步：执行第一组动画  
    animation.opacity(0).rotateX(-100).step();
    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({
      animationData: animation.export()
    })
    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function () {
      // 执行第二组动画  
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({
        animationData: animation
      })
      //关闭  
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示  
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  },
  toDetailPage:function(e){
    var id = e.currentTarget.dataset.roomId;
    console.log(id);
    wx.navigateTo({
      url: '../roomDetail/roomDetail?roomId='+id,
    })
  }
})