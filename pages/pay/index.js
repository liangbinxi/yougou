import { getSetting, chooseAddress, openSetting, showModal, showToast } from '../../utils/asyncwx.js';
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    cart:{},
    totalPrice:0,
    goodNum:0,
    totalNum:0,
  },
  onShow(){
    const address = wx.getStorageSync("address") || {};
    const cart = wx.getStorageSync("cart") || {};
    this.setData({
      address,
      cart
    })

    this.totalPrice(cart)
  },
  //计算总价格
  totalPrice(cart){
    // console.log(123)
    let totalPrice = 0;
    let goodNum = 0;
    let cartArr = Object.values(cart);
    cartArr.forEach(v => {
      if(v.checked===true){
        totalPrice+=v.goods_price*v.num;
        goodNum+=v.num;
      }
    });
    this.setData({
      cart,
      totalPrice,
      goodNum,
    })
    wx.setStorageSync("cart", cart);
      
  }
  
})