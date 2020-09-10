// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const _ = cloud.database().command
  const updateData = !event.collection?{collections: _.push(event.openid)}:{collections: _.pull(event.openid)}
  cloud.database().collection('articles_list').doc(event.id).update({
    data: updateData
  })

}