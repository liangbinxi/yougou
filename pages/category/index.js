import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
import {getStorageCate,setStorageCate} from '../../utils/storage.js'

Page({
  data:{
    //分类左侧列表数组
    leftMenuList:[],
    //分类右侧商品列表
    rightGoodsList:[],
    //左侧列表索引
    currentIndex:0,
    //右侧距离顶部位置距离
    scrollTop:0
  },
  Cates:[],
  onLoad(){
    const cates = getStorageCate();
      // console.log(cates)
      if(!cates){
        console.log("没有数据")
        this.getCategoryList();
      }else{
        // console.log("有数据")
        // console.log(Date.now()-cates.time) 
        if(Date.now()-cates.time > 1000*10){
          // console.log("数据己过期")
          this.getCategoryList();
        }else{
          // console.log("数据没过期")
          this.Cates = cates.data;
          const leftMenuList = this.Cates.map(v=>({
            cat_id:v.cat_id,cat_name:v.cat_name
          }))
          const rightGoodsList = this.Cates[0].children;
          this.setData({
            leftMenuList,
            rightGoodsList
          })
        }
      }
  },
  async getCategoryList(){
    await request({url:'/categories'})
    .then(result=>{
      // console.log(result)
      this.Cates = result;
      // wx.setStorageSync("cates", {time:Date.now(),data:this.Cates});
      setStorageCate({time:Date.now(),data:this.Cates})
      const leftMenuList = this.Cates.map(v=>({
        cat_id:v.cat_id,cat_name:v.cat_name
      }))
      const rightGoodsList = this.Cates[0].children;
      this.setData({
        leftMenuList,
        rightGoodsList
      })
    })
  },
  handleMenuChange(e){
    console.log(e.currentTarget.dataset)
    const {index} = e.currentTarget.dataset;
    this.setData({
      currentIndex :index,
      rightGoodsList :this.Cates[index].children,
      scrollTop:0
    })
  }
})