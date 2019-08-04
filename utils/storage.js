
/**
 * 获取本地存储中的购物车数据
 */
export const getStorageCart = ()=>{
    return wx.getStorageSync("cart");
}

/**
 * 设置购物车到本地存储中
 * @param {Object} data 
 */
export const setStorageCart = (data)=>{
    wx.setStorageSync("cart", data);
}


/**
 * 获取本地存储中的分类商品数据
 */
export const getStorageCate = ()=>{
    return wx.getStorageSync("cate");
}

/**
 * 设置分类商品数据到本地存储中
 * @param {Object} data 
 */
export const setStorageCate = (data)=>{
    wx.setStorageSync("cate", data);
}
  