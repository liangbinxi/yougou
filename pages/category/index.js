import { request } from "../../request/index.js"
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
    this.getCategoryList();
  },
  getCategoryList(){
    request({url:'/categories'})
    .then(result=>{
      console.log(result)
      this.Cates = result;
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