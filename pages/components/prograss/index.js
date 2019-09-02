// pages/components/prograss/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    duration: {
      type: String,
      value: "00:00"
    },
    currentTime: {
      type: String,
      value: "00:00"
    },
    progressWidth:{
      type: Number,
      value: 0
    },
    waiting:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    linwidth:0
  },
  pageLifetimes:{
    show(){
      let obj = this.createSelectorQuery();
      obj.select('#timeline').boundingClientRect((res) => {
        this.setData({
          linwidth:res.width
        })
      }).exec();
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //点击进度条
    progressClick(e) {
      let w = e.detail.x - e.target.offsetLeft
      console.log(e.detail.x,e.target.offsetLeft)
      const progressWidth = parseFloat(w / this.data.linwidth).toFixed(2);
      this.setData({
        progressWidth:progressWidth*100
      });
    },
    //将宽度传给父组件
    _sendWidth(w) {
      this.triggerEvent('_sendpw',w)
    },
    //进度条拖动效果
    touchStart(e) {
      this.initiated = true;
      //记录手指初始位置
      this.touchx1 = e.changedTouches[0].pageX
      this.progress = parseInt(this.properties.progressWidth * this.data.linwidth/100);
      
    },
    touchMove(e) {
      if (!this.initiated) {
        return
      }
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
    touchEnd() {
      this.initiated = false;
      this.currentTime = this.properties.progressWidth * this.duration / 100 || 0;
      //this._sendPercent()
    },
    
  }
})
