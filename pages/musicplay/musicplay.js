//InnerAudioContext实例
Page({
  /**
   * 页面的初始数据
   */
  data: {
    musicname:'欢迎使用小程序',
    musicimage:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589259285330&di=c47c958ebfddf5e0e01ca887b82bbb5e&imgtype=0&src=http%3A%2F%2Fpic.qjimage.com%2Fpm0222%2Fhigh%2Fpm0222-5921mu.jpg',
    author:'音乐',
    play:false,
    pause:true,
    musiclength:0,
    //显示的时间
    musicm:'00',
    musics:'00',
    sliderValue: 0,
    music:[{
      musicname: "需要人陪",
      author: "王力宏",
      musicsrc: "http://music.163.com/song/media/outer/url?id=25643291.mp3",
      musicimage: "https://y.gtimg.cn/music/photo_new/T002R300x300M000002iWU6B2ZvA8V_1.jpg?max_age=2592000"
    }, 
    {
        musicname: "成都",
        author: "赵雷",
        musicsrc: "http://music.163.com/song/media/outer/url?id=436514312.mp3",
        musicimage: "https://y.gtimg.cn/music/photo_new/T002R300x300M000000jE4g74VS43p_1.jpg?max_age=2592000"
    },
    {
      musicname: "理想",
      author: "赵雷",
        musicsrc: "http://music.163.com/song/media/outer/url?id=29567189.mp3",
      musicimage: "https://y.gtimg.cn/music/photo_new/T002R300x300M0000007ujpB2dTrlW_2.jpg?max_age=2592000"
      },
      {
        musicname: "像鱼",
        author: "王贰浪",
        musicsrc: "http://music.163.com/song/media/outer/url?id=1331819951.mp3",
        musicimage: "https://y.gtimg.cn/music/photo_new/T002R300x300M000001Zrk6t0urxvG_1.jpg?max_age=2592000"
      },
      {
        musicname: "鼓楼",
        author: "赵雷",
        musicsrc: "http://music.163.com/song/media/outer/url?id=447926067.mp3",
        musicimage: "https://y.gtimg.cn/music/photo_new/T002R300x300M000000jE4g74VS43p_1.jpg?max_age=2592000"
      },
      {
        musicname: "离歌",
        author: "张靓颖",
        musicsrc: "http://music.163.com/song/media/outer/url?id=31877250.mp3",
        musicimage: "https://y.gtimg.cn/music/photo_new/T002R300x300M000000rRf4U15qNM1_1.jpg?max_age=2592000"
      },
      {
        musicname: "麻雀",
        author: "李荣浩",
        musicsrc: "http://music.163.com/song/media/outer/url?id=1407551413.mp3",
        musicimage: "https://y.gtimg.cn/music/photo_new/T002R300x300M000000yf4nE3Jf5kw_1.jpg?max_age=2592000"
      },
      {
        musicname: "年少有为",
        author: "李荣浩",
        musicsrc: "http://music.163.com/song/media/outer/url?id=1293886117.mp3",
        musicimage: "https://y.gtimg.cn/music/photo_new/T002R300x300M000004QnEHc3zjC7J_1.jpg?max_age=2592000"
      },
      {
        musicname: "倒数",
        author: "邓紫棋",
        musicsrc: "http://music.163.com/song/media/outer/url?id=1299550532.mp3",
        musicimage: "https://y.gtimg.cn/music/photo_new/T002R300x300M000003cKIKZ1J4Yyu_1.jpg?max_age=2592000"
      },
      {
        musicname: "look at me now",
        author: "Charlie Puth",
        musicsrc: "http://music.163.com/song/media/outer/url?id=459876327.mp3",
        musicimage: "https://y.gtimg.cn/music/photo_new/T002R300x300M000002LKchS4D8riK_1.jpg?max_age=2592000"
      },
      {
        musicname: "出山",
        author: "花粥",
        musicsrc: "http://music.163.com/song/media/outer/url?id=1313354324.mp3",
        musicimage: "http://p1.music.126.net/xUAfdMHdXhu3BmO4g8nOYA==/109951163573311341.jpg?param=177y177"
      },
      {
        musicname: "出山",
        author: "花粥",
        musicsrc: "http://music.163.com/song/media/outer/url?id=1313354324.mp3",
        musicimage: "http://p1.music.126.net/xUAfdMHdXhu3BmO4g8nOYA==/109951163573311341.jpg?param=177y177"
      }
      ]
  },
  //播放按钮事件
  starttime:0,
  ring:0,
  play:function(){
    this.audio=wx.getBackgroundAudioManager()
    this.audio.title=this.data.music[this.ring].musicname
    this.audio.src =this.data.music[this.ring].musicsrc
    this.audio.coverImgUrl = this.data.music[this.ring].musicimage
    this.audio.singer = this.data.music[this.ring].author
    this.audio.seek(this.starttime)
    this.audio.play()
    this.setData({
      pause:false,
      play:true,
      musicimage: this.data.music[this.ring].musicimage,
      musicname: this.data.music[this.ring].musicname,
      author: this.data.music[this.ring].author
    })
    this.audio.onEnded(() => {
      this.setData({
        pause: true,
        play: false,
      })
      this.after()
    }),
    this.audio.onCanplay(() => {
      // 必须。可以当做是初始化时长
      this.audio.duration;
      // 必须。不然也获取不到时长
      setTimeout(() => {
        this.setData({
          musiclength:(this.audio.duration)
        })
      }, 1000)
    })
    this.audio.onPlay(()=>{
      this.audio.currentTime
      setInterval(()=>{
        this.setData({
          sliderValue: this.audio.currentTime,
          musics: ((this.audio.currentTime).toFixed(0)%60 > 9 ? (this.audio.currentTime).toFixed(0)%60 : '0'+(this.audio.currentTime).toFixed(0)%60),
          musicm: (((this.audio.currentTime) / 60).toFixed(0) > 9 ? ((this.audio.currentTime) / 60).toFixed(0) : '0'+((this.audio.currentTime) / 60).toFixed(0))
        })
      },100)
    })
  },
  //暂停按钮事件
  pause:function(){
    this.starttime=this.audio.currentTime
    this.audio.pause()
    this.setData({
      pause: true,
      play: false
    })
  },
  /**
   * 滑动进度条事件
   */
  change:function(event){
    console.log()
    this.audio.seek(event.detail.value)
  },
  after:function(){
    this.audio.stop()
    this.audio.seek(0)
    this.ring++
    this.play()
  },
  before: function () {
    this.audio.stop()
    this.audio.seek(0)
    this.ring--
    this.play()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  }  
})