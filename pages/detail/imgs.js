// pages/detail/imgs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    horizontal:false,
    imgscrollTop:0,
    imgscrollt:0,
    imgArr:[
      "https://dimg06.c-ctrip.com/images/100c0r000000hcukgEB4E_R_1600_10000_Mtg_7.jpg",
      "https://dimg03.c-ctrip.com/images/10050r000000hcpmeF899_R_1600_10000_Mtg_7.jpg",
      "https://dimg02.c-ctrip.com/images/10020r000000hhaa0F62A_R_1600_10000_Mtg_7.jpg",
      "https://dimg03.c-ctrip.com/images/100p0r000000h8ql1974B_R_1600_10000_Mtg_7.jpg",
      "https://dimg04.c-ctrip.com/images/100w0r000000hg8ka1637_R_1600_10000_Mtg_7.jpg",
      "https://dimg06.c-ctrip.com/images/100j060000001zubw0C9D_R_1600_10000_Mtg_7.jpg",
      "https://dimg08.c-ctrip.com/images/fd/tg/g5/M03/F0/13/CggYr1bJ1wiAaSlFAAHRsbxJylY218_R_1600_10000_Mtg_7.jpg",
      "https://dimg03.c-ctrip.com/images/fd/tg/g4/M05/A5/FE/CggYHlbQLMGAWPMtAANiLmoyGYo191_R_1600_10000_Mtg_7.jpg",
      "https://dimg08.c-ctrip.com/images/fd/tg/g4/M0B/03/F3/CggYHVbSdxSAc4bBAARmE0ZEqSc112_R_1600_10000_Mtg_7.jpg",
      "https://dimg01.c-ctrip.com/images/fd/tg/g5/M0A/D7/6E/CggYr1bSdxSATtTYAAOs2ELEHZA659_R_1600_10000_Mtg_7.jpg",
      "https://dimg01.c-ctrip.com/images/fd/tg/g4/M0B/AC/F4/CggYHFbQLMKAfkvdAAMPkUYcDr4410_R_1600_10000_Mtg_7.jpg",
      "https://dimg03.c-ctrip.com/images/fd/tg/g5/M0B/D7/6E/CggYr1bSdxWAPmYDAAUeSqWVJJ0853_R_1600_10000_Mtg_7.jpg",
      "https://dimg07.c-ctrip.com/images/fd/tg/g5/M04/08/25/CggYsFbT3tCASX8kAALKgSkDD2E046_R_1600_10000_Mtg_7.jpg",
      "https://dimg06.c-ctrip.com/images/tg/146/195/717/c9f75a8e28e2476ba5e82e091afe6253_C_1600_1200_Mtg_7.jpg",
      "https://dimg02.c-ctrip.com/images/fd/tg/g4/M02/39/2C/CggYHFbLtTSAa2HMAAWD60CN7x4926_R_1600_10000_Mtg_7.jpg",
      "https://dimg08.c-ctrip.com/images/fd/tg/g4/M04/2C/EE/CggYHlbT3tCACjugAARkl5ljxQ8621_R_1600_10000_Mtg_7.jpg",
      "https://dimg02.c-ctrip.com/images/fd/tg/g3/M04/CE/0D/CggYGlbSdxSAER6wAAKDee9Pdco962_R_1600_10000_Mtg_7.jpg",
      "https://dimg03.c-ctrip.com/images/fd/tg/g6/M0A/7E/A6/CggYslbQLMCAaALWAAQIdkE9Nmw912_R_1600_10000_Mtg_7.jpg",
      "https://dimg03.c-ctrip.com/images/fd/tg/g3/M05/E7/B7/CggYGVbSdxOAXol7AAUelUlhkno111_R_1600_10000_Mtg_7.jpg",
      "https://dimg02.c-ctrip.com/images/fd/tg/g4/M02/26/37/CggYHVbTYlGAFTEkAASPeatX6xs013_R_1600_10000_Mtg_7.jpg",
      "https://dimg05.c-ctrip.com/images/100o13000000v80yw193B_R_1600_10000_Mtg_7.jpg",
      "https://dimg03.c-ctrip.com/images/100313000000vawvv5717_R_1600_10000_Mtg_7.jpg",
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      horizontal: wx.getSystemInfoSync().windowWidth > (wx.getSystemInfoSync().windowHeight + 100) ? true : false
    }) 
  },
  onReady:function(){
    this.registerMossEventListener()
  },
  previewImg:function(e){
    var index = e.currentTarget.dataset.index;
    var imgArr = this.data.imgArr;
    wx.previewImage({
      current: imgArr[index],     //当前图片地址
      urls: imgArr,               //所有要预览的图片的地址集合 数组形式
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  imgsScroll(e){
    this.setData({
      imgscrollTop:e.detail.scrollTop
    })
  },
  //注册语音控制
  registerMossEventListener(){
    wx.addMossEventListener({
      mossSpeech: ["上一页","下一页"]
    }, this.onSkillCommand)
  },

  onSkillCommand(res){
    let that = this;
    let content = res.skillCommand.parameters.content;
    if(content == '上一页'){
      wx.createSelectorQuery().select('.imgslist').boundingClientRect().exec(res=>{
        that.setData({
          imgscrollt:that.data.imgscrollTop - res[0].height
        })
      })
    }
    if(content == '下一页'){
      wx.createSelectorQuery().select('.imgslist').boundingClientRect().exec(res=>{
        that.setData({
          imgscrollt:that.data.imgscrollTop + res[0].height
        })
      })
    }
  }

})