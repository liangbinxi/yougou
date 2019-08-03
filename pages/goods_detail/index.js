import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    goodsInfo:{}
  },
  onLoad(options){
    this.getGoodsDetail(options.goods_id)
  },
  async getGoodsDetail(id){
    await request({url:'/goods/detail',data:{goods_id:id}})
    .then(res=>{
      // console.log(res)
      this.setData({
        goodsInfo:{
          goods_name :res.goods_name,
          goods_price : res.goods_price,
          pics : res.pics,
          goods_introduce : res.goods_introduce
        }
      })
    })
  }
})