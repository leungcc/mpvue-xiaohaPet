// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init();

const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  console.log('----print cloud function\'s arg event and context')
  console.warn(event)
  console.warn(context)

  return db.collection('user').add({
    data: event.userData
  })
  

  // return {
  //   event,
  //   context
  // }
}