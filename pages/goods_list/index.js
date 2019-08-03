import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    tabs:[
      {id:0,title:"综合",isActive:true},
      {id:1,title:"销量",isActive:false},
      {id:2,title:"综合",isActive:false}
      ],
    goodsList:[]
  },
  queryParam :{
    //搜索关键字
    query:"",
    //分类id
    cid:"",
    //页码
    pagenum:1,
    //页容量
    pagesize:10
  },
  TotalPages:1,
  onLoad(e){
    // console.log(e)
    // console.log(this)
    this.queryParam.cid = e.id;
    this.getGoodsList()
  },
  async getGoodsList(){
    await request({url:"/goods/search",data:this.queryParam})
    .then(res=>{
      // console.log(res)
      this.TotalPages = Math.ceil(res.total/this.queryParam.pagesize)
      // console.log(this.TotalPages)
      this.setData({
        goodsList : [...this.data.goodsList,...res.goods]
      })
      wx.stopPullDownRefresh();
    })
  },
  handleItemchange(e){
    // console.log(e)
    const {index} = e.detail;
    let {tabs} = this.data;
    tabs.forEach((v,i) => i ===index?v.isActive=true:v.isActive=false );
    this.setData({tabs})
  },
  onPullDownRefresh(){
    // console.log("触发了下拉刷新")
    this.setData({
      goodsList : []
    })
    this.queryParam.pagenum = 1;
    this.getGoodsList();
    // wx.showToast({
    //   title: '刷新成功',
    //   icon: 'success',
    //   duration: 1000
    // })
    
  },
  //滚动条触底事件
  onReachBottom(){
    // console.log(123)
    if(this.TotalPages>this.queryParam.pagenum){
      this.queryParam.pagenum++;
      this.getGoodsList();
    }else{
      wx.showToast({
        title: '没有更多了',
        icon: 'none'
      })
      
    }
  }
})