import { getSetting, chooseAddress, openSetting } from '../../utils/asyncwx.js';
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    address:{}
  },
  async handleChooseAddress(){
    
    const res1 = await getSetting();
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
    this.setData({
      address : wx.getStorageSync("address") || {}
    })
  }
})