// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const _ = cloud.database().command
  
  cloud.database().collection('articles_list').doc(event.id).update({
    data: {
      zan: _.inc(1)
    }
  })

}