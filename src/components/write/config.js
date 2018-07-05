import Validator from 'validator.tool'
export function validate (data) {
  let v = new Validator()
  let bool = false
  let msg = ''

  if (!v.required(data.title)) {
    msg = '标题不能为空'
  } else if (!v.maxLength(data.title, 100)) {
    msg = '标题长度过长'
  } else if (!v.required(data.content)) {
    msg = '内容不能为空'
  } else if (!v.minLength(data.content, 5)) {
    msg = '内容太短咯～'
  } else if (!v.isEmail(data.email)) {
    msg = '邮箱格式错误哟～'
  } else if (!v.isPhone(data.phone)) {
    msg = '手机格式错误哟～'
  } else {
    bool = true
  }
  return {
    bool,
    msg
  }
}
