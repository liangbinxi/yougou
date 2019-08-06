
export const openSetting = () =>{
    return new Promise((resolve,reject)=>{
        wx.openSetting({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {}
        });
          
    })
}

export const getSetting = function(){
    return new Promise((resolve,reject)=>{
        wx.getSetting({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {}
        });
          
    })
}

export const chooseAddress = () =>{
    return new Promise((resolve,reject)=>{
        wx.chooseAddress({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {}
        });
          
    })
}
/**
 * promise形式的wx.showModal
 * @param {object} param0 想要传递的参数
 */
export const showModal = ({content}) =>{
   return new Promise((resolve,reject)=>{
        wx.showModal({
            title: '提示',
            content: content,
            success: (result) => {
                resolve(result)
            }
        });
          
    })
}