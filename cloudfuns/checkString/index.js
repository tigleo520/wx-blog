// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    console.log(event.content)
    var result = await cloud.openapi.security.msgSecCheck({
      content: event.content,
    });
    return result;
  } catch (err){
    console.log(err);
    throw err;
  }
}