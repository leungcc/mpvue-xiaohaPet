export function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

/**
 * @desc cloudFunction是否正确返回
 */
export function cloudFunctionHasNext(resp) {
  if(resp.result) return resp;
  return Promise.reject();
}

export function respShowError(err) {
  console.error(err)
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export default {
  formatNumber,
  formatTime,
  cloudFunctionHasNext
}
