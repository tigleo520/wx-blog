// pages/category/category.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryList: [],
    articleList: [],
    id: '',
    search: '',
    pageNum: 1,
    pageSize: 8,
    reachBottom: false,
    gotop: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCategorysList()
    this.getArticlesList()
  },
  // 获取 分类列表
  getCategorysList() {
    db.collection('categories').get()
    .then(res => {
        this.setData({
          categoryList: res.data,
        })
    })
  },
  // 获取 文章列表
  getArticlesList() {
    const { id, search, pageNum, pageSize, reachBottom } = this.data
    // 匹配文章列表 正则条件
    const reg = search===''? [{
      category: db.RegExp({
        regexp: '.*' + id,
      })
    }]:[{
      title: db.RegExp({
        regexp: '.*' + search,
        options: 'i'
      })
    },{
      content: db.RegExp({
        regexp: '.*' + search,
        options: 'i'
      })
    }]
    
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    // 获取 文章总条数
    const _ = db.command
    db.collection('articles_list').where(_.or(reg)).count()
    .then(res=>{
      this.setData({
        total: res.total
      })
    })
    db.collection('articles_list').where(_.or(reg)).orderBy('posttime', 'desc').skip((pageNum - 1) * pageSize).limit(pageSize)
    .get()
    .then(res => {
      this.setData({
        articleList: reachBottom ? res.data : [...this.data.articleList, ...res.data],
      })
      wx.hideLoading()
    })
  },
  // 点击 选择文章分类
  handleSelect(e) {
    this.setData({
      id: e.currentTarget.dataset.id,
      search: '',
      pageNum: 1,
      reachBottom: true
    })
    this.getArticlesList()
  },
  // 搜索 文章
  handleSearch(e) {
    this.setData({
      search: e.detail,
      id: '',
      pageNum: 1,
      reachBottom: true
    })
    this.getArticlesList()
  },
  // 上拉触底
  onReachBottom() {
    let { pageNum, pageSize, total } = this.data
    const pageTotal = Math.ceil(total / pageSize)

    if(pageNum < pageTotal) {
      this.setData({
        pageNum: pageNum + 1,
        reachBottom: false
      })
      this.getArticlesList()
    }else {
      wx.showToast({
        title: '没有更多数据了',
        icon: 'success',
        duration: 1000
      }) 
    }
  },
  // 获取滚动条当前位置
  onPageScroll(e) {
    if(e.scrollTop > 100) {
      this.setData({
        gotop: true
      })
    }else {
      this.setData({
        gotop: false
      })
    }
  },
  // 回到顶部
  goTop() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  }
})
