const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();
const _ = db.command;

//云函数入口函数
exports.main = async (event, context) => {
  let user;
  const userResp = await db.collection('user').where({
    openid: event.userInfo.openId
  }).get()
  console.log('---userResp')
  console.log(userResp)
  if(userResp) {
    user = userResp && userResp.data && userResp.data[0] || null;
  }
  if(!user) {
    console.error('user is null')
    return Promise.reject(userResp);
  }
  const params = {
    touser: event.userInfo.openId,
    weappTemplateMsg: {
      templateId: 'Y9KnLsWEix9hTxg3TztfVEufDC4uZAcT_4BXeHWXmVU',
      page: 'page/page/index',
      formId: event.formId,
      data: {
        keyword1: { value: `${user.nickName}`},
        keyword2: { value: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`},
        keyword3: { value: `能看到这条信息就肯定是成功咯`},
        keyword4: { value: ''},
        keyword5: { value: '打洗大衰哈'}
      },
      emphasisKeyword: ''
    }
  }
  console.log('params----')
  console.log(params)
  const resp = await cloud.openapi.uniformMessage.send(params);

  return resp;
}