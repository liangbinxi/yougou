
let ajaxTimes = 0;
export const request = (params)=>{
    const baseUrl="https://api.zbztb.cn/api/public/v1";
    ajaxTimes++;
    wx.showLoading({ title: "加载中" });
    return new Promise((resolve,reject)=>{
        var reqTask = wx.request({
            // url: '',
            // data: {},
            // header: {'content-type':'application/json'},
            // method: 'GET',
            // dataType: 'json',
            // responseType: 'text',
            ...params,
            url:baseUrl + params.url,
            success: (result) => {
                resolve(result.data.message)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {
                ajaxTimes--;
                wx.hideLoading();
            }
        });
          
    })
}