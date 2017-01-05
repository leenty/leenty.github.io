---
title: vue2.0一起在懵逼的海洋里越陷越深（六）
date: 2016-12-18 22:47:23
tags: [vuejs, vue-router]
---
### 前言
本文章系列：[vue2.0一起在懵逼的海洋里越陷越深 (http://leenty.com/tags/vuejs/)](http://leenty.com/tags/vuejs/)
[演示场地vue2.0 Demo](http://vue2.leenty.com),这是[源码地址](https://github.com/leenty/vue2),觉得靠谱的话欢迎加星跟随,有问题欢迎评论和指正😃

在vue开发SPA应用的过程中，多数情况下我们需要解决一个问题
就是在路由跳转的过程中需要更新你SPA应用的`title` ，
这一节不说其他，就展示如何使用`vue-router`的**导航钩子**去解决这么一个问题。
接下来就愉快的去玩耍啦！
![红红火火恍恍惚惚](http://www.leenty.com/img/vue/huaji_ld.jpg)

### 正文
好的，介绍下背景，我有这么一个[博客的demo](http://vue2.leenty.com)，里面有多个版块，每个版块有着不同的名称(`title`)
先看一下Demo的路由结构
```
vue2.leenty.com
├── home                # 首页版块
├── article             # 文章版块
│   ├── vue2-1            # 具体文章一
│   ├── vue2-2            # 具体文章二
│   ├── vue2-3            # 具体文章三
│   ├── vue2-4            # 具体文章四
│   ├── vue2-5            # 具体文章五
│   └── vue2-6            # 具体文章六
└── demo                # 演示版块
    └── demo-1            # 具体演示一
```
好的，接下来要实现的是在切换路由的时候同时的去切换你页面的`title`

#### 思路
这里思路是使用`vue-router`的路由全局导航钩子去解决这个问题
在路由对象里添加一个`title`字段以供路由全局导航钩子读取并更新页面`title`

#### 配置路由
所以第一步，先在路由对象里添加这一个字段。
打开`src/routes.js`([源文件地址：https://github.com/leenty/vue2/blob/master/src/routes.js](https://github.com/leenty/vue2/blob/master/src/routes.js))
**（注意是`routes.js`,这是咱用来存放路由对象的文件）**
在原有数据的基础上添加`title`
这里其实vue1.0和vue2.0的实现是差不多的，所以vue1.0也是可以使用的。
vue2.0路由对象提供了一个`meta`字段来给你存放一些其他信息，所以这里就可以用来存放`title`
vue1.0的话是没有这个字段的，所以可以直接与`path`平级。
具体如下：
```js
const routes = [
  {
    name: 'Home',
    path: '/',
    meta: {
      title: 'home' // 主页的title为home
    },
    component: require('./components/Home.vue')
  },
  {
    name: 'Article',
    path: '/article',
    meta: {
      title: 'article' // 文章模块相应的title为article
    },
    component: require('./components/Article.vue'),
    children: [
      {
        name: 'vue2_1',
        path: '/article/vue2_1',
        meta: {
          title: 'vue2.0一起在懵逼的海洋里越陷越深（一）' // 子路由也是一样的道理
        },
        component: require('./md/articles/vue2-1.md')
      },
      // ... 子路由和父路由都差不多，所以后面的就省略了
    ]
  },
  {
    name: 'Demo',
    path: '/demo',
    meta: {
      title: 'demo' // 演示模块title为demo
    },
    component: require('./components/Demo.vue'),
    children: [
      {
        name: 'DemoVuexState',
        path: 'vuex_state',
        meta: {
          title: 'vuex演示'
        },
        component: require('./components/DemoVuexState.vue')
      }
    ]
  }
]

export default routes
```
如此这般，各个页面的`title`就预设好了

小明：”为什么`title`里不加上站点名后缀？像`demo - leenty blog`这样？“
老师：“滚出去！”

其实是这样的，后缀如果一个个加也是可以的，但为什么不用语句帮我们加上去呢？
这样就一劳永逸啦，再也不用自己一个个打后缀了，哈哈哈，真TM机智！
![mdzz](http://www.leenty.com/img/vue/mdzz.jpg)

#### 路由导航钩子介绍
讲一讲这个所谓的全局导航钩子，听起来玄不愣登的。。。

导航是发生在路由改变时的事件，这也是为何网页的导航条叫导航条的原因
尤大大的原话是：“正如其名，vue-router 提供的导航钩子主要用来拦截导航，让它完成跳转或取消。有多种方式可以在路由导航发生时执行钩子：全局的, 单个路由独享的, 或者组件级的”
说的很明白，言简意赅，其实就是能让你控制导航的一个方法而已
导航钩子分为全局，单个路由独享和组件级别的。
但不论如何，导航钩子都接受一个函数为参数，并会在导航过程中调用这个函数。
函数会被传入3个参数，分别为`to, from, next`
没错，你看字面意思应该理解了个大概，即：
`from`：你从哪里来？(问询消息的小弟A)
`to`：要到哪里去？(问询消息的小弟B)
`next`：让不让过去还得看老子我的！(大哥你懂不)

上面这位大哥(`next`)会有三中方法！
```js
next() // 默认通过路由
next(false) // 中止导航，那么将会跳回到from的地址
next({ path: '/' }) // 跟一个路由参数对象，将会中止当前导航并跳往指向的路由
```

好的，先看看全局的写法
**全局导航钩子**一共两个，`router.beforeEach`和`router.afterEach`
一个触发于导航开始前，一个触发于导航开始后。用法呢，都是一样的，如下！
```js
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  console.log('小弟B：哎呀妈呀！大兄弟，这是要去哪呀？', to)
  console.log('小弟A：大兄弟，哪儿旮沓的呀！', from)
  next(false) // 大哥：谁让你过去的？
  // 调用next(false)中止导航，于是页面回到跳转前
})

router.afterEach((to, from, next) => {
  console.log('小弟B：哎呀妈呀！大兄弟，这是要去哪呀？', to)
  console.log('小弟A：大兄弟，哪儿旮沓的呀！', from)
  next() // 大哥：过去吧！
  // 调用next通过路由
})
``

**单个路由独享的钩子**，同样是两个方法`beforeEnter`和`afterEnter`，同样的套路。
套路如下：
```js
const router = new VueRouter({
  routes: [
    {
      path: '/demo',
      component: Demo,
      beforeEnter: (to, from, next) => {
        console.log('小弟B：哎呀妈呀！大兄弟，这是要去哪呀？', to)
        console.log('小弟A：大兄弟，哪儿旮沓的呀！', from)
        next() // 大哥：过去吧！
        // 调用next通过路由
      },
      afterEnter: (to, from, next) => {
        console.log('小弟B：哎呀妈呀！大兄弟，这是要去哪呀？', to)
        console.log('小弟A：大兄弟，哪儿旮沓的呀！', from)
        next({ path: '/' }) // 大哥：像那边走！
        // 调用next({ path: '/' })中止导航，并跳到首页
      }
    }
  ]
})
```

**组件内的钩子**，依然是一对基友方法`beforeRouteEnter`和`beforeRouteLeave`
套路还是一样的0.0
```js
const Demo = {
  template: `<div>this is a Demo </div>`,
  beforeRouteEnter (to, from, next) {
    console.log('小弟B：哎呀妈呀！大兄弟，这是要去哪呀？', to)
    console.log('小弟A：大兄弟，哪儿旮沓的呀！', from)
    next() // 大哥：过去吧！
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当钩子执行前，组件实例还没被创建
  },
  beforeRouteLeave (to, from, next) {
    console.log('小弟B：哎呀妈呀！大兄弟，这是要去哪呀？', to)
    console.log('小弟A：大兄弟，哪儿旮沓的呀！', from)
    next() // 大哥：过去吧！
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```

#### 配合路由全局导航钩子去更新`title`
好的，三种都介绍完了，那么打开`src/router.js`，没错，这回是`router.js`，这是咱装载路由的文件

在此之前，我们还需要知道在一个嵌套路由情况下的节点分布。
三个参数之一的`to`存在属性`to.matched`,里面存在了一个包含路由节点的数组
顺序是从子路由到根路由

好的，确定下title文案

router             | title
:----------------- | :-----:
`├── home         `| leenty blog
`├── article      `| article - leenty blog
`│   ├── vue2-1   `| vue2.0一起在懵逼的海洋里越陷越深（一） - article - leenty blog
`│   ├── ...      `| ... - article - leenty blog
`│   └── vue2-6   `| vue2.0一起在懵逼的海洋里越陷越深（六） - article - leenty blog
`└── demo         `| demo - leenty blog
`    └── demo-1   `| 具体演示1 - demo - leenty blog

里面的结构是这样的
```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

const title = 'leenty blog'
// 定义我们站点的名字

Vue.use(VueRouter)

/* eslint-disable no-new */
const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'u-link--Active',
  routes
})

// 路由导航钩子，beforeEach，在路由进入前调用
router.beforeEach((to, from, next) => {
  let titleStr = ''
  // 检测是不是要跳转首页，如果是，则不处理
  if (to.name !== 'Home') {
    // 倒序遍历数组获取匹配到的路由节点，拼接各部分title
    for (let i = to.matched.length - 1; i >= 0; i--) {
      titleStr += `${to.matched[i].meta.title} - `
    }
  }
  // 添加站点名
  titleStr += title
  // 更新title
  document.title = titleStr
  // 继续路由导航
  next()
})

export default router
```

ok，打完收工！现在可以切换路由看看`title`有没有在变化了。
可以看我的Demo[http://vue2.leenty.com](http://vue2.leenty.com)，四处切换路由，看看标题如何变化吧！

### 其他
[演示地址(http://vue2.leenty.com)](http://vue2.leenty.com)
[源码地址(https://github.com/leenty/vue2)](https://github.com/leenty/vue2)
[github主页](https://github.com/leenty),觉得靠谱的话欢迎加星跟随



