// components/blog-ctrl/blog-ctrl.js
let userInfo = {}
const db = wx.cloud.database()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    blogId: String,
    blog: Object,
  },

  externalClasses: ['iconfont', 'icon-pinglun', 'icon-fenxiang'],

  /**
   * 组件的初始数据
   */
  data: {
    // 登录组件是否显示
    loginShow: false,
    // 底部弹出层是否显示
    modalShow: false,
    content: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onComment() {
      // 判断用户是否授权
      wx.getSetting({
        success: (res) => {
          if (res) {
            console.log(111)
            wx.getUserProfile({
              lang: 'zh_CN',
              desc: "获取您的昵称、头像、地区及性别",
              success: (res) => {
                console.log(res)
                userInfo = res.userInfo
                // 显示评论弹出层
                this.setData({
                  modalShow: true,
                })
              },
              fail: (res) => {
                wx.showModal({
                  title: '授权用户才能进行评价',
                  content: '',
                })
              }
            })
          } else {
            this.setData({
              loginShow: true,
            })
          }
        }
      })
    },

    onSend() {
      // 插入数据库
      this.subscribeMsg()
      let content = this.data.content
      if (content.trim() == '') {
        wx.showModal({
          title: '评论内容不能为空',
          content: '',
        })
        return
      }
      wx.showLoading({
        title: '评论中',
        mask: true,
      })
      db.collection('blog-comment').add({
        data: {
          content,
          createTime: db.serverDate(),
          blogId: this.properties.blogId,
          nickName: userInfo.nickName,
          avatarUrl: userInfo.avatarUrl
        }
      }).then((res) => {
        // 推送订阅消息
        wx.cloud.callFunction({
          name: 'subscribeMsg',
          data: {
            content,
            nickName: userInfo.nickName,
            createTime: db.serverDate(),
            blogId: this.properties.blogId
          }
        }).then((res) => {
          console.log(res)
        })

        wx.hideLoading()
        wx.showToast({
          title: '评论成功',
        })
        this.setData({
          modalShow: false,
          content: '',
        })

        // 父元素刷新评论页面
        this.triggerEvent('refreshCommentList')
      })
    },

    // 调起客户端小程序订阅消息界面
    subscribeMsg() {
      const tmplId = 'TBW5C80ysJHvQLms2pViltcFPuvRhSiqjqDWUtSSr6o'
      wx.requestSubscribeMessage({
        tmplIds: [tmplId],
        success: (res) => {
          console.log(res)
          if (res[tmplId] === 'accept') {
            wx.showToast({
              icon: 'none',
              title: '订阅成功',
            })
          } else {
            wx.showToast({
              icon: 'none',
              title: '订阅失败，无法接收订阅消息',
            })
          }
        }
      })
    },


    // 获取textarea内容
    onInput(event){
        this.setData({
          content: event.detail.value
        })
    }
  }
})
