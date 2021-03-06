# cloud-music

这是云开发的快速启动指引，其中演示了如何上手使用云开发的三大基础能力：

- 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 文档型数据库
- 文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理
- 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码

## 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

## 主要功能

- 系统提供歌单列表，音乐播放（包括播放进度条、播放动画、歌曲切换），博客（包括发布、评论、分享等），个人信息（包括最近播放、我的博客等）等功能
- 小程序端采用微信小程序原生方式开发，服务端使用云函数，数据库使用云数据库，图片存储使用云存储，后台管理系统的前端使用 vue，后台管理系统的后端使用 koa2
- 组件化开发思想，云函数包括定时触发器、操作云数据库、tcb-router 路由优化、突破读取数据条数限制
- 前后端分离架构，通过 CORS 解决跨域问题

## 主要界面
- 主界面

![image](https://user-images.githubusercontent.com/81566673/136797397-192326d3-e39b-4d96-873d-7305732cdb5d.png)
- 博客界面

![image](https://user-images.githubusercontent.com/81566673/136797730-527281ab-d0cd-46cc-8b74-7cd882d01e2f.png)
- 我的界面

![image](https://user-images.githubusercontent.com/81566673/136797796-b3a345be-00fa-4d86-b310-c7c2f2f92f85.png)
