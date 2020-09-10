// pages/collection/collection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articlesList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getArticlesList()
  },

  getArticlesList() {
    const openid = wx.getStorageSync("openid"); 
    wx.cloud.database().collection('articles_list').get()
    .then(res => {
      const articlesList = res.data.filter(v=>v.collections?v.collections.includes(openid):false)
      this.setData({
        articlesList
      })
    })
  }
})