import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
import {getStorageCart,setStorageCart} from '../../utils/storage.js'
Page({
  data: {
    goodsInfo:{}
  },
  GoodsObj:{},
  onLoad(options){
    this.getGoodsDetail(options.goods_id)
  },
  async getGoodsDetail(id){
    await request({url:'/goods/detail',data:{goods_id:id}})
    .then(res=>{
      // console.log(res,123)
      this.GoodsObj = res;
      this.setData({
        goodsInfo:{
          goods_name :res.goods_name,
          goods_price : res.goods_price,
          pics : res.pics,
          goods_introduce : res.goods_introduce.replace('.webp','.jpg')
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
  },
  handleCartAdd(){
    // let cart = wx.getStorageSync("cart")||{};
    let cart = getStorageCart()||{};
      
    if(cart[this.GoodsObj.goods_id]){
      console.log("数据已经存在")
      cart[this.GoodsObj.goods_id].num++;
    }else{
        //第一次该商品添加购物车
        console.log("第一次该商品添加购物车")
        cart[this.GoodsObj.goods_id] = this.GoodsObj;
        cart[this.GoodsObj.goods_id].num =1;
    }
    setStorageCart(cart);
    wx.showToast({
      title: '添加成功',
      icon: 'none',
      duration: 1500,
      //mask: true 会在提示图标消失前形成一个遮罩层，用户无法操作
      mask: true,
    });
      
  }
})