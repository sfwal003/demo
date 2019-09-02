// pages/components/indexplay/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    currentTitle:{
      type:String,
      value:""
    },
    duration:{
      type:Number,
      value:0
    },
    currentTime:{
      type:Number,
      value:0
    }
  },

  attached(){
    
  },
  /**
   * 组件的初始数据
   */
  data: {
    openico:"../../../images/shouqi@2x.png",
    closeico:"../../../images/zhankaid@2x.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeShow(){
      this.setData({
        isShow:!this.properties.isShow
      })
    },
    //点击进度条
    progressClick(e){
      console.log(e);
      let w = e.detail.x - e.target.offsetLeft
    },
    //将宽度传给父组件
    _sendWidth(w){
      this.setData({
        progressWidth:w
      });
    },
    //进度条拖动效果
    touchStart(ev){
      this.touch.initiated = true
      //记录手指初始位置
      this.touch.x1 = e.changedTouches[0].pageX
      //progress的当前宽度
      this.touch.w = this.$refs.progress.clientWidth
    },
    touchMove(ev){
        if(!this.touch.initiated){
            return
        }
        this.touch.x2 = ev.touches[0].pageX
        let offset = Math.min(Math.max(0,this.touch.x2 - this.touch.x1 + this.touch.w),this.$refs.progressBar.clientWidth - 16)
        this._offset(offset)
    },
    touchEnd(){
        this.touch.initiated = false
        this._sendPercent()
    },
    //进度函数
    setProgress(duration, currentTime) {
      return {
        duration: utils.formatTime(new Date(duration)),
        currentTime: utils.formatTime(new Date(currentTime)),
        progressWidth: parseFloat(currentTime / duration * 100).toFixed(2)
      };
    },
  }
})
