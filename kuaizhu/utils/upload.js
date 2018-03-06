/**
 * 最终上传到cos的URL
 * 把以下字段配置成自己的cos相关信息，详情可看API文档 https://www.qcloud.com/document/product/436/6066
 * REGION: cos上传的地区
 * APPID: 账号的appid
 * BUCKET_NAME: cos bucket的名字
 * DIR_NAME: 上传的文件目录
 */

// var cosUrl = "https://" + "ap-guangzhou" + ".file.myqcloud.com/files/v2/" + "1255976527" + "/" + "kuaizhu-1255976527" + "/iCon"

var cosUrl = "https://kuaizhu-1255976527.cos.ap-guangzhou.myqcloud.com/iCon"

//这里是自己的域名，上面注释的是腾讯云的demo的域名
// var cosUrl = "https://" + "www.kzroom.club/" + "1255976527" + "/" + "kuaizhu-1255976527" + "houseImage"

// //填写自己的鉴权服务器地址
// var cosSignatureUrl = 'https://www.kzroom.club/v1/signature?file=iCon/headImage.png&method=post'

/**
 * 上传方法
 * filePath: 上传的文件路径
 * fileName： 上传到cos后的文件名
 */
function upload(filePath, fileName, success, fail) {
  
  var cosSinUrl = 'https://www.kzroom.club/v1/signature?file=iCon/' + fileName + '&method=post'
  console.log("文件地址",filePath);
  console.log("签名地址",cosSinUrl);
  wx.request({
    url: cosSinUrl,
    success: function (cosRes) {

      // 签名
      var signature = cosRes.data.result[0]
      console.log("这里的签名",signature),
      // 头部带上签名，上传文件至COS
        console.log("这里的url", cosUrl + '/' + fileName),
      wx.uploadFile({
        url: cosUrl + '/' + fileName,

        filePath: filePath,
        
        name: 'file',
        formData: {
          'key': fileName,
          'success_action_status': 200,
          'Signature': signature
        },
        success: function (uploadRes) {
          var data = uploadRes.data
          // console.log('uploadRes 上传ok啦', uploadRes)
          //do something
          success(uploadRes.data)
        },
        fail: function (e) {
          console.log('e', e)
          fail()
        }
      })
    }
  })
}

module.exports = upload