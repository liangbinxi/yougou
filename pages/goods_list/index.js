import { request } from "../../request/index.js"
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
    pagesize:5
  },
  onLoad(e){
    // console.log(e)
    // console.log(this)
    this.queryParam.cid = e.id;
    this.getGoodsList()
  },
  getGoodsList(){
    request({url:"/goods/search",data:this.queryParam})
    .then(res=>{
      // console.log(res)
      this.setData({
        goodsList : res.goods
      })
    })
  },
  handleItemchange(e){
    // console.log(e)
    const {index} = e.detail;
    let {tabs} = this.data;
    tabs.forEach((v,i) => i ===index?v.isActive=true:v.isActive=false );
    this.setData({tabs})
  }
})