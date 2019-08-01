export const request = (params)=>{
    const baseUrl="https://api.zbztb.cn/api/public/v1";
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
            }
        });
          
    })
}