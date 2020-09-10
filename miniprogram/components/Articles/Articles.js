// components/Articles/Articles.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    articleList: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表id
   */
  methods: {
    handleArticleTap(e) {
      const { id } = e.currentTarget.dataset
      const db = wx.cloud.database()
      const _ = db.command
      db.collection('articles_list').doc(id).update({
        data: {
          view: _.inc(1)
        }
      })
    }
  }
})
