import {http} from "../../../utils/http";
import data from '../../../utils/data';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pcode:{
      type:String,
      value:""
    },
    ccode:{
      type:String,
      value:""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    provinces:"",
    citys:[],
    horizontal:false
  },

  attached:function(){
    this.getcitys()
    this.setData({
      horizontal: wx.getSystemInfoSync().windowWidth > (wx.getSystemInfoSync().windowHeight + 100) ? true : false
    }) 
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getcitys:function(){
      //http('/citys',{},(res)=>{})
      let p = data.provinces;
      p.forEach(element => {
        if(element.code == this.properties.pcode){
          this.setData({
            provinces:element.name,
            citys:element.cities
          })
        }
      });
    },
    choosecity(){
      wx.navigateTo({
        url: '../../pages/chooseprovinces/index'
      })
    },
    _changeCity(e){
      this.triggerEvent('changeCity', e.currentTarget)
    }
  }
})
