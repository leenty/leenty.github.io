---
title: vue2.0一起在懵逼的海洋里越陷越深（一）
date: 2016-10-21 01:08:25
tags: vueJs
---
### 就在今年的10月份，Vue2.0发布啦，来懵逼的海洋里一起下沉吧！
前段阵子都没有发随笔，一方面要准备一场考试，另一方面是在研究vue2.0，又一方面一时也不知道写点什么好。
***（而其实最大的方面是自己找到了偷懒不写随笔的理由了。。。）***
 
************

![vue2.0](/img/vue/vue2.0.png)

** @周星星和江南另外三大才子有佳句流传：**
山下一群鹅，嘘声赶落河.
下河捉鹅医肚饿，吃完回家玩...
呃...玩vue2.0 咳咳咳咳

** 先看看vue2.0多了哪些好玩的 **
* virtual-DOM（据说不是普通的Virtual-DOM）
* Templates || JSX || Hyperscript(现在，你可以选择你喜欢的编写模式进行开发了)
* 流式服务端渲染（这个听起来很厉害，后面一起研究）
* 其他（各种性能优化，更多想象发挥空间，更多可能）

** 伴随着vue2.0的更新，vue生态链的其他组件也跟着进行了更新 **
* vue-router
* vue-resource
* vue-cli

### 好，进入正题
先贴个地址，[我的vue2.0的demo](http://vue2.leenty.com)
这个demo使用vue-cli快速生成还发环境
加入vue-router做前端路由
加入vue-resource做ajax
加入vuex做状态管理
demo里目前使用hash模式
具体的会在接下来一一介绍

** 具体细节 **

好的，现在打开你的终端，开始开车啦！🚌
* 安装vue-cli
```shell
npm install -g vue-cli
```
* 创建vue项目
语法：
```shell
vue init <template-name> <project-name>
```
这里我选择使用webpack来创建（可以参考[git入门级-在github创建项目](/2016/06/02/git入门级-在github创建项目/)）
```shell
vue init webpack app
```
之后vue-cli就会询问Project name，你可以输入你的工程名，或者直接回车就会默认使用之前的名称
之后还会有一系列询问，你可以一路回车下来，这样就创建好了一个
大概会是这样子
![vue-cli](/img/vue/vue-cli.png)
* 安装依赖
```shell
npm i
```
当完成这一步步骤后就可以使用命令启动vue应用了
```shell
npm run dev
```
* 接下来就安装其他需要的组件，vue-router,vue-resource,vuex
```shell
npm install vue-router vue-resource vuex --save
```
到这一步，vue项目的骨架已经好了。



