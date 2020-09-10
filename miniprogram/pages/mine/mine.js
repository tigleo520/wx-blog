// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const userInfo = wx.getStorageSync("userInfo")
    this.setData({
      userInfo
    })
  },

  handleGetUserInfo(e){
    const userInfo = e.detail.userInfo
    this.setData({
      userInfo
    })
    wx.setStorageSync("userInfo", userInfo); 
  }

})