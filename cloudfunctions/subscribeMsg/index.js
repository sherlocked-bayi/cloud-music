// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const {
    OPENID
  } = cloud.getWXContext()

  const result = await cloud.openapi.subscribeMessage.send({
    touser: OPENID,
    page: `/pages/blog-comment/blog-comment?blogId=${event.blogId}`,
    data: {
      name2: {
        value: event.nickName
      },
      thing3: {
        value: event.content
      }
    },
    templateId: 'TBW5C80ysJHvQLms2pViltcFPuvRhSiqjqDWUtSSr6o',
    formId: event.formId
  })
  return result
}