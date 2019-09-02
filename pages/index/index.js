//index.js
import {http} from "../../utils/http";
import utils from '../../utils/util';
import data from '../../utils/data';
//获取应用实例
const app = getApp()

//首页moss免唤醒语料
let mossSpeech = ["播放景区列表", "打开省份列表","开启沿途推荐","关闭沿途推荐","打开播放列表","收起播放列表","上一个","上一个景点","下一个","下一个景点","暂停","暂停播放","继续","继续播放","快进","快退","上一页","下一页"];

Page({
  data: {
    pcode:'4200',
    ccode:'4201',
    lists:[],
    playList:[],
    currentsong:0,
    isplay:false,
    isShow:false,
    currentTitle:"",
    waiting:false,
    duration:"00:00",
    currentTime:"00:00",
    progressWidth:0,
    openico:"../../images/shouqi@2x.png",
    closeico:"../../images/zhankaid@2x.png",
    linwidth:0,
    initiated:false,
    horizontal:false,
    playtime:0,
    islistshow:false,
    ytState:false,
    src:'',
    playlistscrolltop:0,
    playlistscrollt:0
  },
  onLoad(){
    //this.player = wx.createInnerAudioContext();   
    this.setData({
      horizontal:wx.getSystemInfoSync().windowWidth > (wx.getSystemInfoSync().windowHeight + 100) ? true : false
    }) 
    this.getlists();
  },
  onReady(){
    this.player = wx.createAudioContext('myAudio')
    this.registerMossEventListener()
  },
  onShow(){
    this.selectComponent("#tabbar").getcitys();
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
    this.next();
  },
  // 音频播放进度控制
  timeupdate(e){
    let that = this
    that.duration = e.detail.duration * 1000 || 0;
    that.currentTime = e.detail.currentTime * 1000 || 0;
    //console.log(that.duration,that.currentTime)
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
  onerror(e){
    let that = this
    setTimeout(function(){
      this.next()
    },2000)
  },
  //改变城市
  changecity(e){
    this.setData({
      ccode:e.detail.dataset.ccode
    })
  },
  //改变播放器或者播放列表显示状态
  changeShow(){
    if(this.data.islistshow){
      this.setData({
        islistshow:false
      })
      return
    }
    this.setData({
      isShow:!this.data.isShow
    })
  },
  //获取当前城市景点列表
  getlists:function(){
    let playlist=[];
    // http('/wuhan',{},(res)=>{})
    for(let i=0;i<data.lists.length;i++){
      playlist.push(data.lists[i].mp3)
    }
    this.setData({
      lists:data.lists,
      playList:playlist,
      currentTitle: data.lists[0].name,
    })
    this.playsrc();
  },
  //显示播放列表
  showlist:function(){
    this.setData({
      islistshow:true
    })
  },
  //点击播放列表切换音乐
  changesong:function(e){
    this.setData({
      currentsong:e.currentTarget.dataset.index
    })
    this.playsrc();
    this.player.play();
  },
  //移出播放列表
  removesong(e){
    let arr = this.data.playList;
    arr.splice(e.currentTarget.dataset.index,1);
    this.setData({
      playList:arr
    })
    if(arr.length == 0){
      this.setData({
        islistshow:false,
        isShow:false,
        currentsong:-1
      })
      this.player.stop();
      return
    }
    this.playsrc();
    this.player.play();
  },
  //音频设置
  playsrc(){
    console.log(this.data.currentsong)
    this.setData({
      src:this.data.playList[this.data.currentsong].url
    })
    //this.player.src = this.data.playList[this.data.currentsong].url;
    //this.player.title = this.data.playList[this.data.currentsong].title;
    this.duration = this.player.duration * 1000 || 0;
  },
  //添加音频
  addPlayList(e){
    this.setData({
      currentsong:e.detail.dataset.index,
      isplay:true,
      isShow:true,
      currentTitle:this.data.lists[e.detail.dataset.index].name
    })
    this.playsrc()
    this.player.play();
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
  changeplayshow(){
    this.setData({
      isShow:false
    })
  },
  //上一首
  prev() {
    let current = this.data.currentsong
    if(current == 0){
      wx.showToast({
        title: '当前已经是第一首哦~',
        icon: 'none', 
        duration: 1000, 
        mask: true,
      });
      return
    }
    this.setData({
      currentsong: --current,
      currentTitle:this.data.lists[current].name
    })
    this.playsrc()
    this.player.play()
  },
  //下一首
  next(){
    let current = this.data.currentsong
    if(current == this.data.playList.length - 1){
      wx.showToast({
        title: '当前已经是最后一首哦~',
        icon: 'none', 
        duration: 1000, 
        mask: true,
      });
      return
    }
    this.setData({
      currentsong: ++current,
      currentTitle:this.data.lists[current].name
    })
    this.playsrc()
    this.player.play()
    
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
    //console.log(e.detail.x,e.target.offsetLeft)
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
    // this.player.onSeeked((res)=>{
    //   this.onTimeUpdate(this)
    // })
    this.setData({
      progressWidth:progressWidth*100,
      initiated:false
    });
  },
  onHide: function () {
    this.player.pause()
  },
  //改变沿途推荐
  changeYtState(){
    this.setData({
      ytState:!this.data.ytState
    })
  },
  playlistscroll(e){
    this.setData({
      playlistscrolltop:e.detail.scrollTop
    })
  },
  playlistlastpage(){
    wx.createSelectorQuery().select('.scrolllist').boundingClientRect().exec(res=>{
      this.setData({
        playlistscrollt:this.data.playlistscrolltop - res[0].height
      })
    })
  },
  playlistnextpage(){
    wx.createSelectorQuery().select('.scrolllist').boundingClientRect().exec(res=>{
      this.setData({
        playlistscrollt:this.data.playlistscrolltop + res[0].height
      })
    })
  },
  //注册语音控制
  registerMossEventListener(){
    wx.addMossEventListener({
      mossSpeech: mossSpeech
    }, this.onSkillCommand)
  },
  // let mossSpeech = ["播放景区列表", "打开省份列表","开启沿途推荐","关闭沿途推荐","打开播放列表","收起播放列表","上一个","上一个景点","下一个","下一个景点","暂停","暂停播放","继续","继续播放","快进","快退","上一页","下一页"];
  onSkillCommand(res){
    let that = this;
    let content = res.skillCommand.parameters.content;
    if (content == '播放景区列表') {
      if(that.data.playList.length > 0){
        wx.playTTS({
          content: '已为您开始播放该城市列表的语音介绍',
          volume: 50
        })
        this.player.play();
      }else{
        wx.playTTS({
          content: '抱歉，当前列表没有景区信息',
          volume: 50
        })
      }
    }
    if(content == '上一个' || content == '上一个景点'){
      let current = that.data.currentsong
      if(current == 0){
        wx.playTTS({
          content: '当前已经是第一首哦',
          volume: 50
        })
      }else{
        that.setData({
          currentsong: --current,
          currentTitle:that.data.lists[current].name
        })
        that.playsrc()
        that.player.play()
      }
    }
    if(content == '下一个' || content == '下一个景点'){
      let current = that.data.currentsong
      if(current == that.data.playList.length - 1){
        wx.playTTS({
          content: '当前已经是最后一首哦',
          volume: 50
        })
      }else{
        that.setData({
          currentsong: ++current,
          currentTitle:that.data.lists[current].name
        })
        that.playsrc()
        that.player.play()
      }
    }
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
    if(content == '上一页'){
      if(that.data.islistshow){
        that.playlistlastpage()
        return
      }
      that.selectComponent("#spotlist").lastpage();
    }
    if(content == '下一页'){
      if(that.data.islistshow){
        that.playlistnextpage()
        return
      }
      that.selectComponent("#spotlist").nextpage();
    }
    if (content == '打开省份列表') {
      wx.playTTS({
        content: '已为您打开省份列表，请选择您要查看的省份',
        volume: 50
      })
      wx.navigateTo({
        url: '../chooseprovinces/index'
      })
    }
    if (content == '开启沿途推荐') {
      wx.playTTS({
        content: '已为您开启沿途推荐',
        volume: 50
      })
      that.setData({
        ytState:true
      })
    }
    if (content == '关闭沿途推荐') {
      wx.playTTS({
        content: '已为您关闭沿途推荐',
        volume: 50
      })
      that.setData({
        ytState:false
      })
    }
    if (content == '打开播放列表') {
      that.setData({
        islistshow:true
      })
    }
    if (content == '收起播放列表') {
      that.setData({
        islistshow:false
      })
    }
  }
})
