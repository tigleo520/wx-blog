# 个人博客小程序

> 小程序采用原生微信云开发，实现功能：文章列表、文章详情展示，文章关键字搜索，用户点赞、收藏、转发、评论，用户登录

## 1. 项目 目录结构

```
cloudfuncs    云函数
+
  login       获取openid
  zan         点赞
  collection  文章收藏
  comment     评论

miniprogram   小程序主程序
+ 
  components  自定义组件
  imgs        静态图片资源
  styles      公共样式、字体图标
  pages       小程序页面

```

## 2. 功能介绍
```
1. 文章列表、详情展示
2. 文章关键字搜索
3. 用户登录、点赞、收藏、评论
4. 用户收藏文章展示
```

## 3. 页面说明
```
主页      index
分类      category
我的      mine

文章详情  article
文章收藏  collection
联系方式  contact
```
## 4. towxml 富文本解析应用