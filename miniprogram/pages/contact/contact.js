// pages/contact/contact.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  handleContact() {
    const url = 'cloud://tigleo.7469-tigleo-1302350389/610153505.jpg'
    wx.previewImage({
      current: url,
      urls: [url]
    }) 
  }

})