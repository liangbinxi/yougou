import { getSetting, chooseAddress, openSetting } from '../../utils/asyncwx.js';
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {

  },
  async handleChooseAddress(){
    // wx.getSetting({
    //   success: (result1) => {
    //     console.log(result1)
    //     const scopeAddress = result1.authSetting["scope.address"]
    //     console.log(scopeAddress)
    //     if(scopeAddress===true || scopeAddress===undefined){
    //       wx.chooseAddress({
    //         success (res) {
    //           console.log(res.userName)
    //           console.log(res.postalCode)
    //           console.log(res.provinceName)
    //           console.log(res.cityName)
    //           console.log(res.countyName)
    //           console.log(res.detailInfo)
    //           console.log(res.nationalCode)
    //           console.log(res.telNumber)
    //         }
    //       })
    //     }else{
    //       wx.openSetting({
    //         success: (result2) => {
    //           console.log(result2)
    //         }
    //       });
            
    //     }
    //   }
    // });
    const res1 = await getSetting();
    const scopeAddress = res1.authSetting["scope.address"];
    console.log(scopeAddress)
    if(scopeAddress===true || scopeAddress=== undefined){
      const res2 = await chooseAddress();
      console.log(res2);
    }else{
      await openSetting();
      const res3 = await chooseAddress();
      console.log(res3)
    }
  }
})