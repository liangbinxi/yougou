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
  },
  //点击轮播图放大预览
  handlePreviewImage(e){
    // console.log(e)
    // console.log(this.data.goodsInfo)
    const {index} = e.currentTarget.dataset;
    const urls = this.data.goodsInfo.pics.map(v=>v.pics_big);
    const current = urls[index];
    wx.previewImage({
      current,
      urls
    })
  }
})