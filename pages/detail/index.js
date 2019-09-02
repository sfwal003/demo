// pages/detail/index.js
import {http} from "../../utils/http";
import utils from '../../utils/util';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:false,
    isplay:false,
    currentTitle:"",
    waiting:false,
    duration:"00:00",
    currentTime:"00:00",
    progressWidth:0,
    linwidth:0,
    horizontal:false,
    playtime:0,
    //ceshishuju
    src:"http://cdn.tour.hizoo.cn/audio_new/mp3/chibi/s_10.mp3",
    imgs:[
      {
      "id": 262891005,
      "bigImgUrl": "https://dimg06.c-ctrip.com/images/100c0r000000hcukgEB4E_R_1600_10000_Mtg_7.jpg",
      },
      {
      "id": 262899146,
      "bigImgUrl": "https://dimg03.c-ctrip.com/images/10050r000000hcpmeF899_R_1600_10000_Mtg_7.jpg",
      },
      {
      "id": 262890329,
      "bigImgUrl": "https://dimg02.c-ctrip.com/images/10020r000000hhaa0F62A_R_1600_10000_Mtg_7.jpg",
      },
      {
      "id": 262897954,
      "bigImgUrl": "https://dimg03.c-ctrip.com/images/100p0r000000h8ql1974B_R_1600_10000_Mtg_7.jpg",
     
      },
      {
      "id": 262897259,
      "bigImgUrl": "https://dimg04.c-ctrip.com/images/100w0r000000hg8ka1637_R_1600_10000_Mtg_7.jpg",
      
      },
      {
      "id": 78054989,
      "bigImgUrl": "https://dimg06.c-ctrip.com/images/100j060000001zubw0C9D_R_1600_10000_Mtg_7.jpg",
     
      },
      {
      "id": 9197607,
      "bigImgUrl": "https://dimg08.c-ctrip.com/images/fd/tg/g5/M03/F0/13/CggYr1bJ1wiAaSlFAAHRsbxJylY218_R_1600_10000_Mtg_7.jpg",
      
      },
      {
      "id": 9519738,
      "bigImgUrl": "https://dimg03.c-ctrip.com/images/fd/tg/g4/M05/A5/FE/CggYHlbQLMGAWPMtAANiLmoyGYo191_R_1600_10000_Mtg_7.jpg",
      
      },
      {
      "id": 9959207,
      "bigImgUrl": "https://dimg08.c-ctrip.com/images/fd/tg/g4/M0B/03/F3/CggYHVbSdxSAc4bBAARmE0ZEqSc112_R_1600_10000_Mtg_7.jpg",
      
      },
      {
      "id": 9959208,
      "bigImgUrl": "https://dimg01.c-ctrip.com/images/fd/tg/g5/M0A/D7/6E/CggYr1bSdxSATtTYAAOs2ELEHZA659_R_1600_10000_Mtg_7.jpg",
      
      },
      {
      "id": 9519736,
      "bigImgUrl": "https://dimg01.c-ctrip.com/images/fd/tg/g4/M0B/AC/F4/CggYHFbQLMKAfkvdAAMPkUYcDr4410_R_1600_10000_Mtg_7.jpg",
      
      },
      {
      "id": 9959218,
      "bigImgUrl": "https://dimg03.c-ctrip.com/images/fd/tg/g5/M0B/D7/6E/CggYr1bSdxWAPmYDAAUeSqWVJJ0853_R_1600_10000_Mtg_7.jpg",
      
      },
      {
      "id": 10252926,
      "bigImgUrl": "https://dimg07.c-ctrip.com/images/fd/tg/g5/M04/08/25/CggYsFbT3tCASX8kAALKgSkDD2E046_R_1600_10000_Mtg_7.jpg",
      
      },
      {
      "id": 9360997,
      "bigImgUrl": "https://dimg06.c-ctrip.com/images/tg/146/195/717/c9f75a8e28e2476ba5e82e091afe6253_C_1600_1200_Mtg_7.jpg",
      
      },
      {
      "id": 8281769,
      "bigImgUrl": "https://dimg02.c-ctrip.com/images/fd/tg/g4/M02/39/2C/CggYHFbLtTSAa2HMAAWD60CN7x4926_R_1600_10000_Mtg_7.jpg",
      
      },
      {
      "id": 10252927,
      "bigImgUrl": "https://dimg08.c-ctrip.com/images/fd/tg/g4/M04/2C/EE/CggYHlbT3tCACjugAARkl5ljxQ8621_R_1600_10000_Mtg_7.jpg",
      
      },
      {
      "id": 9959209,
      "bigImgUrl": "https://dimg02.c-ctrip.com/images/fd/tg/g3/M04/CE/0D/CggYGlbSdxSAER6wAAKDee9Pdco962_R_1600_10000_Mtg_7.jpg",
      
      },
      {
      "id": 9519730,
      "bigImgUrl": "https://dimg03.c-ctrip.com/images/fd/tg/g6/M0A/7E/A6/CggYslbQLMCAaALWAAQIdkE9Nmw912_R_1600_10000_Mtg_7.jpg",
      
      },
      {
      "id": 9959202,
      "bigImgUrl": "https://dimg03.c-ctrip.com/images/fd/tg/g3/M05/E7/B7/CggYGVbSdxOAXol7AAUelUlhkno111_R_1600_10000_Mtg_7.jpg",
      
      },
      {
      "id": 10151081,
      "bigImgUrl": "https://dimg02.c-ctrip.com/images/fd/tg/g4/M02/26/37/CggYHVbTYlGAFTEkAASPeatX6xs013_R_1600_10000_Mtg_7.jpg",
      
      },
      {
      "id": 312720452,
      "bigImgUrl": "https://dimg05.c-ctrip.com/images/100o13000000v80yw193B_R_1600_10000_Mtg_7.jpg",
      },
      {
      "id": 312720114,
      "bigImgUrl": "https://dimg03.c-ctrip.com/images/100313000000vawvv5717_R_1600_10000_Mtg_7.jpg",
      
      },
   
  ]

  },

  /**
   * 生命周期函数
   */
  onLoad:function (options) {
    //this.player = wx.createInnerAudioContext();
    this.setData({
      horizontal: wx.getSystemInfoSync().windowWidth > (wx.getSystemInfoSync().windowHeight + 100) ? true : false
    }) 
  },
  onReady:function(){
    this.player = wx.createAudioContext('myAudio')
    this.registerMossEventListener()
  },

  onShow: function () {
    let obj = this.createSelectorQuery();
      obj.select('#timeline').boundingClientRect((res) => {
        this.setData({
          linwidth:res.width
        })
      }).exec();
  },
  //audio标签API
  // 音频播放触发
  onplay(){
    this.setData({
      isplay: true
    });
  },
  // 音频暂停后
  onpause(){
    this.setData({ isplay: false });
  },
  // 自然播放后，自动切换到下一首
  onended(){
  },
  // 音频播放进度控制
  timeupdate(e){
    let that = this
    that.duration = e.detail.duration * 1000 || 0;
    that.currentTime = e.detail.currentTime * 1000 || 0;
    console.log(that.duration,that.currentTime)
    const {duration, currentTime, progressWidth} = that.setProgress(that.duration, that.currentTime);
    if (that.data.initiated) {
      that.setData({
        currentTime,
        playtime:that.currentTime,
        waiting: false
      });
      return;
    }
    that.setData({
      duration,
      currentTime,
      progressWidth,
      playtime:that.currentTime,
      waiting: false
    });
  },
  //音频错误
  onerror(err){
    console.log(err)
    let that = this
    setTimeout(function(){
      this.next()
    },2000)
  },
  //改变播放状态
  changePlayerStatus() {
    this.setData({
      isplay: !this.data.isplay
    });
    if (this.data.isplay) {
      this.player.play();
    } else {
      this.player.pause();
    }
  },
  openintro(){
    this.setData({
      isShow:true
    })
  },
  closeintro() {
    this.setData({
      isShow: false
    })
  },
  //进度函数
  setProgress(duration, currentTime) {
    return {
      duration: utils.formatTime(new Date(duration)),
      currentTime: utils.formatTime(new Date(currentTime)),
      progressWidth: parseFloat(currentTime / duration * 100).toFixed(2)
    };
  },
  //点击进度条
  progressClick(e) {
    let w = e.detail.x - e.target.offsetLeft
    const progressWidth = parseFloat(w / this.data.linwidth).toFixed(2);
    this.setData({
      progressWidth:progressWidth*100
    });
    this.currentTime = this.data.progressWidth * this.duration / 100 || 0;
    this.player.seek(this.currentTime / 1000);
  },
  //进度条拖动效果
  touchStart(e) {
    this.setData({
      initiated:true
    })
    //记录手指初始位置
    this.touchx1 = e.changedTouches[0].pageX
    this.progress = parseInt(this.data.progressWidth * this.data.linwidth/100);
    
  },
  touchMove(e) {
    let spacing = this.progress + e.changedTouches[0].pageX - this.touchx1;
    if (spacing >= this.data.linwidth) {
      spacing = this.data.linwidth;
    } else if (spacing <= 0) {
      spacing = 0;
    }
    const progressWidth = parseFloat(spacing / this.data.linwidth).toFixed(2);
    this.setData({
      progressWidth:progressWidth*100
    });
  },
  touchEnd(e) {
    let spacing = this.progress + e.changedTouches[0].pageX - this.touchx1;
    if (spacing >= this.data.linwidth) {
      spacing = this.data.linwidth;
    } else if (spacing <= 0) {
      spacing = 0;
    }
    const progressWidth = parseFloat(spacing / this.data.linwidth).toFixed(2);
    
    this.currentTime = progressWidth * this.duration || 0;
    this.player.seek(this.currentTime / 1000);
    this.setData({
      progressWidth:progressWidth*100,
      initiated:false
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  detailimg(){
    wx.navigateTo({
      url: '../../pages/detail/imgs'
    })
  },
  //注册语音控制
  registerMossEventListener(){
    wx.addMossEventListener({
      mossSpeech: ["打开景区详情", "关闭景区详情","打开详情", "关闭详情","打开图集","暂停","暂停播放","继续","继续播放","快进","快退"]
    }, this.onSkillCommand)
  },
  onSkillCommand(res){
    let that = this;
    let content = res.skillCommand.parameters.content;
    if(content == '暂停' || content == '暂停播放'){
      that.setData({
        isplay: false
      });
      that.player.pause();
    }
    if(content == '继续' || content == '继续播放'){
      that.setData({
        isplay: true
      });
      that.player.play();
    }
    if(content == '快进'){
      that.player.seek((that.data.playtime + 5000) / 1000);
    }
    if(content == '快退'){
      that.player.seek((that.data.playtime - 5000) / 1000);
    }
    if (content == '打开景区详情' || content == '打开详情') {
      wx.playTTS({
        content: '已为您打开当前景点详情介绍',
        volume: 50
      })
      that.openintro();
    }
    if (content == '关闭景区详情' || content == '关闭详情') {
      wx.playTTS({
        content: '已为您关闭当前景点详情介绍',
        volume: 50
      })
      that.closeintro();
    }
    if (content == '打开图集') {
      wx.playTTS({
        content: '已为您打开当前景点图集',
        volume: 50
      })
      that.detailimg()
    }
  }
})