import utils from '../../../utils/util';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    horizontal:false,
    scrollTop:0,
    scrollt:0
  },

  attached:function(){
    this.setData({
      horizontal: wx.getSystemInfoSync().windowWidth > (wx.getSystemInfoSync().windowHeight + 100) ? true : false
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    _addPlay(e){
      this.triggerEvent('addPlayList', e.currentTarget)
    },
    detail(){
      wx.navigateTo({
        url: '../../pages/detail/index'
      })
    },
    lastpage(){
      wx.createSelectorQuery().select('.scrolllist').boundingClientRect().exec(res=>{
        this.setData({
          scrollt:this.data.scrollTop - res[0].height
        })
      })
    },
    nextpage(){
      wx.createSelectorQuery().select('.scrolllist').boundingClientRect().exec(res=>{
        this.setData({
          scrollt:this.data.scrollTop + res[0].height
        })
      })
    },
    _changeplay(e){
      this.setData({
        scrollTop:e.detail.scrollTop
      })
      this.triggerEvent('changeplay')
    }
  }
})
