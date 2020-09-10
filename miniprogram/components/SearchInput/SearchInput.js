// components/SeachInput/SeachInput.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    inputValue: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    confirmTap(e) {
      console.log(e.detail.value);
      this.getArticle(e.detail.value)
    },
    handleBlur(e) {
      this.setData({
        inputValue: e.detail.value
      })
    },
    handleSearch() {
      console.log(this.data.inputValue);
      this.getArticle(this.data.inputValue)
    },
    getArticle(str) {
      this.triggerEvent('search', str)
    }
  }
})
