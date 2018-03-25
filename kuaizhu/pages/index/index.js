//index.js
//获取应用实例
var app = getApp()
var Loger = require("../../utils/Loger.js");
var utils = require("../../utils/util.js");

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    comeon:"frist code!",

    ballOpacity:8,
    ballBottom:20,
    ballRight:16,
    ballBottomTwo:75,
    
    showModalStatus: false,
    phone:'',

    pageData:[
      
    ],
    pageNumber:0,
    jingxuanfangyuan:" 精选房源 ",
    
  },
  
  
  onLoad: function () {
   var that = this
   wx.request({
     url: 'https://www.kzroom.club/v1/city/queryRentRooms?city=广州&pageNumber=0&pageSize=12',
     success: function (res) {

      for(var i = 0;i<res.data.result.length;i++){
        if (res.data.result[i].RentalProperties.length<=3){
          res.data.result[i]["tagString"] = res.data.result[i].RentalProperties.join(" | ")
        }else{
          var tempArr = res.data.result[i].RentalProperties.splice(2, res.data.result[i].RentalProperties.length - 3)
          console.log("剪切后的数据",tempArr)
          res.data.result[i]["tagString"] = res.data.result[i].RentalProperties.join(" | ")
        }
        res.data.result[i]["timeStr"] = that.getDateDiff(res.data.result[i].releseTime)

      }

      console.log("修改后数据：",res.data.result)
       that.setData({
         pageData:res.data.result
       })
       console.log(res.data.result)
     },
     fail: function (err) {
       console.log(err)
     }
   })
   
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
    var that = this
    that.setData({
      pageNumber:0
    })
    wx.request({
      url: 'https://www.kzroom.club/v1/city/queryRentRooms?city=广州&pageNumber=0&pageSize=12',
      success: function (res) {
        
        for (var i = 0; i < res.data.result.length; i++) {
          if (res.data.result[i].RentalProperties.length <= 3) {
            res.data.result[i]["tagString"] = res.data.result[i].RentalProperties.join(" | ")
          } else {
            var tempArr = res.data.result[i].RentalProperties.splice(2, res.data.result[i].RentalProperties.length - 3)
            res.data.result[i]["tagString"] = res.data.result[i].RentalProperties.join(" | ")
          }
          res.data.result[i]["timeStr"] = that.getDateDiff(res.data.result[i].releseTime)

        }
        that.setData({
          pageData: res.data.result
        })

        that.setData({
          pageData: res.data.result
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  ballClickEvent: function () {
    console.log("点击了下面");
  },
  ballClickEventTwo: function () {
    console.log("点击了上面");
  },

  powerDrawer: function (e) {
    var that = this
    console.log('点击了弹窗按钮');
    var phone = this.data.phone;
    console.log(phone);
    var currentStatu = e.currentTarget.dataset.statu;
   
    that.userinfor();

    
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
    // 第2步：执行第一组动画  
    animation.opacity(0).rotateX(-100).step();
    // 第2步：导出动画对象赋给数据对象储存  
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
  },
  
  checkSettingStatu:function(cb) {
    //授权处理
    var that = this;

    // 判断是否是第一次授权，非第一次授权且授权失败则进行提醒
    wx.getSetting({
      success: function success(res) {
        var authSetting = res.authSetting;
        if (utils.isEmptyObject(authSetting)) {
          console.log('首次授权');
        } else {
          console.log('不是第一次授权', authSetting);
          // 没有授权的提醒
          if (authSetting['scope.userInfo'] === false) {
            wx.showModal({
              title: '用户未授权',
              content: '如需正常使用此小程序功能，请您按确定并在设置页面授权用户信息',
              showCancel: false,
              success: function (res) {
                // 此处为了用于 Android 系统区分点击蒙层关闭还是点击取消按钮关闭省去了res.confirm，res.cancel判断
                // 点击蒙层同样触发开启设置
                wx.openSetting({
                  success: function success(res) {
                    if (res.authSetting['scope.userInfo'] === false) {
                      // that.checkSettingStatu(cb);
                    } else {
                      that.userinfor();
                    }
                  }
                });
              }
            })
          }
        }
      }
    });
  },
  userinfor: function(){
    var that = this
    //获取用户信息
    wx.login({
      success: function (res) {
        var code = res.code;
        if (res.code) {
          wx.navigateTo({
            url: '../postHouse/post',
          })
        }
      }
    })
  },
  searchScrollLower: function () {
    let that = this;
    console.log("来到了底部")
      that.setData({
          
        searchLoading: true   
      }); 
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showLoading({
      title: '正在加载',
    })

    var that = this
    that.setData({
      pageNumber:that.data.pageNumber+1
    })
    wx.request({
      url: "https://www.kzroom.club/v1/city/queryRentRooms?city=广州&pageNumber=" + that.data.pageNumber + "&pageSize=12",
      success: function (res) {

        for (var i = 0; i < res.data.result.length; i++) {
          if (res.data.result[i].RentalProperties.length <= 3) {
            res.data.result[i]["tagString"] = res.data.result[i].RentalProperties.join(" | ")
          } else {
            var tempArr = res.data.result[i].RentalProperties.splice(2, res.data.result[i].RentalProperties.length - 3)
            res.data.result[i]["tagString"] = res.data.result[i].RentalProperties.join(" | ")
          }
          res.data.result[i]["timeStr"] = that.getDateDiff(res.data.result[i].releseTime)
        }
        
        that.setData({
          pageData: that.data.pageData.concat(res.data.result)
        })
        wx.hideLoading()
        
      },
      fail: function (err) {
        console.log(err)
        wx.hideLoading()
      }
    })
  },

  onPullDownRefresh(){
    
    
    var that = this
    that.setData({
      showPullDownRefresh:true
    })
    wx.request({
      url: 'https://www.kzroom.club/v1/city/queryRentRooms?city=广州&pageNumber=0&pageSize=12',
      success: function (res) {

        for (var i = 0; i < res.data.result.length; i++) {
          if (res.data.result[i].RentalProperties.length <= 3) {
            res.data.result[i]["tagString"] = res.data.result[i].RentalProperties.join(" | ")
          } else {
            var tempArr = res.data.result[i].RentalProperties.splice(2, res.data.result[i].RentalProperties.length - 3)
            console.log("剪切后的数据", tempArr)
            res.data.result[i]["tagString"] = res.data.result[i].RentalProperties.join(" | ")
          }
          res.data.result[i]["timeStr"] = that.getDateDiff(res.data.result[i].releseTime)

        }

        console.log("修改后数据：", res.data.result)
        that.setData({
          pageData: res.data.result
        })
        console.log(res.data.result)
       
        wx.stopPullDownRefresh()
        wx.hideLoading()
      },
      fail: function (err) {
        console.log(err)
      }
    })

  },

  getDateDiff : function (dateTimeStamp){
    var result;
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime();
    var diffValue = now - dateTimeStamp;
    if(diffValue < 0){
      return;
    }
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;
    if(monthC>=1) {
      if (monthC <= 12)
        result = "" + parseInt(monthC) + "月前";
      else {
        result = "" + parseInt(monthC / 12) + "年前";
      }
    }
    else if(weekC>=1) {
      result = "" + parseInt(weekC) + "周前";
    }
    else if(dayC>=1) {
      result = "" + parseInt(dayC) + "天前";
    }
    else if(hourC>=1) {
      result = "" + parseInt(hourC) + "小时前";
    }
    else if(minC>=1) {
      result = "" + parseInt(minC) + "分钟前";
    }else{
      result="刚刚";
    }
    return result;
  },
})