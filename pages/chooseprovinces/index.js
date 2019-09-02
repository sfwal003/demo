import {http} from "../../utils/http";
import data from '../../utils/data';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    provinces:[],
    pcode:"",
    horizontal:false,
    cityscrolltop:0,
    cityscrollt:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '切换地区'
    })
    this.getprovinces();
    this.setData({
      horizontal: wx.getSystemInfoSync().windowWidth > (wx.getSystemInfoSync().windowHeight + 100) ? true : false
    }) 
  },
  onReady:function(){
    this.registerMossEventListener()
  },
  getprovinces:function(){
    //http('/citys',{},(res)=>{})
    this.setData({
      provinces:data.provinces
    })
  },
  choosepcode(e){
    let name = e.target.dataset.name
    wx.navigateTo({
      url: '../../pages/choosecity/index?name=' + name
    })
  },
  cityscroll(e){
    this.setData({
      cityscrolltop:e.detail.scrollTop
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
      wx.createSelectorQuery().select('.citylist').boundingClientRect().exec(res=>{
        that.setData({
          cityscrollt:that.data.cityscrolltop - res[0].height
        })
      })
    }
    if(content == '下一页'){
      wx.createSelectorQuery().select('.citylist').boundingClientRect().exec(res=>{
        that.setData({
          cityscrollt:that.data.cityscrolltop + res[0].height
        })
      })
    }
  }
})