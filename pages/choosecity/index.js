import {http} from "../../utils/http";
import data from '../../utils/data';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    provinces:[],
    pname:"",
    pcode:"",
    citys:[],
    horizontal:false,
    cityscrolltop:0,
    cityscrollt:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.name
    })
    this.setData({
      pname: options.name,
      horizontal: wx.getSystemInfoSync().windowWidth > (wx.getSystemInfoSync().windowHeight + 100) ? true : false
    })
    this.getcitys();
  },
  onReady:function(){
    this.registerMossEventListener()
  },
  getcitys:function(){
    //http('/citys',{},(res)=>{})
    data.provinces.forEach(element => {
      if(element.name == this.data.pname){
        this.setData({
          pcode:element.code,
          citys:element.cities
        })
      }
    });
  },
  choosecity(e){
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];   //当前页面
    let prevPage = pages[pages.length - 3];  //上一个页面
    prevPage.setData({
      pcode:this.data.pcode,
      ccode:e.target.dataset.code
    })
    prevPage.selectComponent("#tabbar").getcitys()
    wx.navigateBack({
      delta: 2
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