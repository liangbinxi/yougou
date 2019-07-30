// pages/index/index.js
Page({
  data: {
    //轮播图列表
    swiperList:[],
    //分类导航列表
    navCateList:[],
    //楼层数据
    floorList:[]
  },
  onLoad(){
    this.getSwiperList()
    this.getNavCateList()
    this.getFloorList()
  },
  getSwiperList(){
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
      success: (result) => {
        // console.log(result)
        this.setData({
          swiperList : result.data.message
        })
      },
    });
  },
  getNavCateList(){
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/catitems',
      success: (result) => {
        // console.log(result)
        this.setData({
          navCateList : result.data.message
        })
      },
    });
      
  },
  getFloorList(){
    var reqTask = wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/floordata',
      success: (result) => {
        // console.log(result)
        this.setData({
          floorList : result.data.message
        })
      },
    });
      
  }
})