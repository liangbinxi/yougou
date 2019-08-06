import { getSetting, chooseAddress, openSetting, showModal } from '../../utils/asyncwx.js';
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    address:{},
    cart:{},
    totalPrice:0,
    goodNum:0,
    isAllchecked:false
  },
  async handleChooseAddress(){
    
    const res1 = await getSetting();
    console.log(res1)
    const scopeAddress = res1.authSetting["scope.address"];
    console.log(scopeAddress)
    if(scopeAddress===true || scopeAddress=== undefined){
      
        
    }else{
      await openSetting();
    }
    const res2 = await chooseAddress();
      console.log(res2);
      res2.all = res2.provinceName+res2.cityName+res2.countyName+res2.detailInfo;
      wx.setStorageSync("address", res2);
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
    let isAllchecked = true;
    let cartArr = Object.values(cart);
    cartArr.forEach(v => {
      if(v.checked===true){
        totalPrice+=v.goods_price*v.num;
        goodNum+=v.num;
      }else{
        isAllchecked = false;
      }
    });
    this.setData({
      cart,
      totalPrice,
      goodNum,
      isAllchecked
    })
  },

  checkedChange(e){
    // console.log(e)
    const {index} = e.currentTarget.dataset;
    // console.log(index)
    let cart = this.data.cart;
    // console.log(cart)
    cart[index].checked = !cart[index].checked
    // console.log(cart[index].checked)
    this.totalPrice(cart)
  },
  isAllchecked(){
    let {isAllchecked,cart} = this.data;
    isAllchecked = !isAllchecked;
    for (const key in cart) {
      if (cart.hasOwnProperty(key)) {
        cart[key].checked=isAllchecked;
      }
    }
    console.log(isAllchecked)
    console.log(cart)
    this.totalPrice(cart)
  },
  async handleNumEdit(e){
    // console.log(e)
    const {operate,id} = e.currentTarget.dataset;
    // console.log(operate,id)
    let {cart} = this.data;
    // console.log(cart)
    //对象中找属性名不用循环
    // for (const key in cart) {
    //   if (cart.hasOwnProperty(key)) {
    //     // const element = object[key];
    //     if(key == id){
    //       cart[key].num +=operate
    //     }
        
    //   }
    // }

    if(cart[id].num ===1 && operate === -1){
        const res = await showModal({content:"是否删除该商品？"});
        // console.log(res)
        if(res.confirm){
          delete cart[id];
          // console.log(cart)
          this.totalPrice(cart)
        }else{
          console.log("用户点击了取消")
        }
        
    }else{
      cart[id].num +=operate; 
      this.totalPrice(cart)
    }
    
  }
})