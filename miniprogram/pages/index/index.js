//Page Object
const db = wx.cloud.database()
Page({
  data: {
    swiperList: [],
    articleList: [],
    pageNum: 1,
    pageSize: 8
  },
  //options(Object)
  onLoad: function(options) {
    this.getSwipersList()
    this.getArticlesList()
  },
  // 获取 轮播图列表
  getSwipersList() {
    db.collection('swipers').get({
      success: res => {
        this.setData({
          swiperList: res.data
        })
      }
    })
  },
  // 获取文章列表
  getArticlesList() {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });

    const { pageNum, pageSize } = this.data
    db.collection('articles_list').count().then(res=>{
      this.setData({
        total: res.total
      })
    })
    
    db.collection('articles_list').orderBy('posttime', 'desc').skip((pageNum - 1) * pageSize).limit(pageSize)
    .get()
    .then(res => {
        this.setData({
          articleList: [...this.data.articleList, ...res.data]
        })
        wx.hideLoading()
    })
  },
  // 上拉触底
  onReachBottom() {
    let { pageNum, pageSize, total} = this.data
    const pageTotal = Math.ceil(total / pageSize)

    if(pageNum < pageTotal) {
      this.setData({
        pageNum: pageNum + 1
      })
      this.getArticlesList()
    }else {
      wx.showToast({
        title: '没有更多数据了',
        icon: 'success',
        duration: 1000
      }) 
    }
  }
})
  