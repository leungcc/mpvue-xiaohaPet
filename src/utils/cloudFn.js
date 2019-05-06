function logCloudFnc(cloudFnName, resp) {
  console.log(`======下面打印云函数${cloudFnName}返回======`);
  console.log(resp);
}

class CloudFn {
  constructor() {}

  //保存用户
  saveUser(data) {
    return wx.cloud.callFunction({
      name: 'saveUser',
      data: data
    })
  }

  /**
   * 调用云函数
   * @param {String} cloudFnName 云函数名字
   */
  async callFunc(cloudFnName, params) {
    const resp = await wx.cloud.callFunction({
      name: cloudFnName,
      data: params
    });
    logCloudFnc(cloudFnName, resp);
    return resp;
  }
}

export default new CloudFn();