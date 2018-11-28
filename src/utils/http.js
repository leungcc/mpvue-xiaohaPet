
const db = wx.cloud.database();
const _ = db.command;

class HttpServer {
  constructor() {
    console.error('!!!!!!!!!new HttpServer');
  }
  
  /**
   * @desc 获取用户信息
   * @param {Object} data 查询条件
   */
  getUser(data) {
    // if(data) {
    //   return db.collection('user').where(data).get();
    // }
    return db.collection('user').get()
  }

  getBook() {
      return db.collection('mybook').get()
  }

  /**
   * @desc 添加用户
   * @param {Object} data 用户信息对象
   */
  addUser(data) {
    return db.collection('user').add({
      data
    })
  }

  /**
   * @desc 删除用户
   * @param {Object} data 
   */
  deleteUser(data) {
    if(data) {
      return db.collection('user').where(data).remove();
    } 
    return db.collection('user').where({}).remove();
  }

  getPatstar(data) {
    if(data) return db.collection('patstar').where(data).get();
    return db.collection('patstar').get();
  }
}

export default new HttpServer()