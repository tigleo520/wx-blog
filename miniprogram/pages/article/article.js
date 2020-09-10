// pages/article/article.js
const db = wx.cloud.database()
const _ = db.command
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    article: {},
    userInfo: {},
    inputValue: '',
    author: false,
    comment: false,
    zan: false,
    collection: false,
    disabled: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: "加载中",
      mask: true,
    })
    this.getArticle(options.id)
    this.getOpenid()
  },

  onShow() {
    this.setData({
      userInfo: wx.getStorageSync("userInfo"),
    })
  },
  // 获取 openid
  getOpenid() {
    wx.cloud.callFunction({
      name: "login",
      success: res => {
        wx.setStorageSync('openid', res.result.openid)
      }
    })
  },
  // 获取 文章详情 
  getArticle(id) {
    const openid = wx.getStorageSync("openid")

    db.collection('articles_list').doc(id).get({
      success: res => {
        const content = app.towxml(res.data.content, 'html')
        this.setData({
          article: {
            _id: res.data._id,
            title: res.data.title,
            content,
            posttime: res.data.posttime,
            view: res.data.view,
            zan: res.data.zan,
            comments: res.data.comments,
            collections: res.data.collections
          },
          collection: res.data.collections?res.data.collections.includes(openid):false
        })
        wx.hideLoading()
      }
    })
  },
  // 点赞
  handleZan() {
    if(this.data.zan) return
    this.setData({
      zan: true
    })
    wx.cloud.callFunction({
      name: 'zan',
      data: {
        id: this.data.article._id
      }
    })
  },
  // 点击 收藏
  handleCollection() {
    if(!this.data.userInfo.nickName) {
      this.setData({
        author: true
      })
      return
    }
    const openid = wx.getStorageSync('openid')
    this.setData({
      collection: !this.data.collection
    })
    wx.cloud.callFunction({
      name: 'collection',
      data: {
        openid,
        id: this.data.article._id,
        collection: !this.data.collection
      }
    })
  },
  // 点击 评论
  handleComment() {
    this.setData({
      comment: true
    })
  },

  handleCommentBack() {
    this.setData({
      comment: false
    })
  },

  handleBlur(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  handlecancle() {
    this.setData({
      author: false
    })
  },
  // 获取 用户信息
  handleGetUserInfo(e) {
    const openid = wx.getStorageSync("openid")
    this.setData({
      author: false,
      userInfo: e.detail.userInfo,
      collection: this.data.article.collections.includes(openid)
    })
    wx.setStorageSync("userInfo", e.detail.userInfo)
  },

  padNum(num) {
    if((''+num).length===1) {
      num = '0' + num
    }
    return num
  },
  // 提交 评论
  handleInput() {
    this.setData({
      disabled: true
    })
    
    const date = new Date()
    const posttime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${this.padNum(date.getHours())}:${this.padNum(date.getMinutes())}`
    const { nickName, avatarUrl } = wx.getStorageSync("userInfo");
    const id = this.data.article._id
    const content = this.data.inputValue
    
    if(!nickName) {
      this.setData({
        author: true,
        disabled: false
      })
      return
    }
    if(content==='') {
      wx.showToast({
        title: '请输入评论内容...',
        icon: 'none',
        duration: 1000
      })
      this.setData({
        disabled: false
      })
      return
    }
    // 评论内容 敏感词检查
    wx.cloud.callFunction({
      name: 'checkString',
      data: {
        content: content,
      }
    }).then(res =>{
      // 评论内容 提交
      wx.cloud.callFunction({
        name: 'comment',
        data: {
          id,
          comment: {
            nickName,
            avatarUrl,
            content,
            posttime
          }
        },
        success: res => {
          this.getArticle(id)
          wx.showToast({
            title: '提交成功',
            icon: 'success'
          });
          this.setData({
            inputValue: '',
            comment: false,
            disabled: false
          })
        }
      })
    }).catch(err =>{
      wx.showToast({
        title: '评论含敏感词汇...',
        icon: 'none'
      })
      this.setData({
        disabled: false
      })
    })
  }
})
