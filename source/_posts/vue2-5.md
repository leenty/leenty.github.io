---
title: vue2.0一起在懵逼的海洋里越陷越深（五）
date: 2016-12-11 22:20:04
tags: [vuejs, vuex, vue-router, css]
---
### 前言
本文章系列：[vue2.0一起在懵逼的海洋里越陷越深 (http://leenty.com/tags/vuejs/)](http://leenty.com/tags/vuejs/)
之前的几篇文章的说了`vue-router`以及`vuex`的简单使用，这次就开始组合这两者进行实际应用。
场地呢就在我的[vue2.0Demo](http://vue2.leenty.com),这是[源码地址](https://github.com/leenty/vue2),觉得靠谱的话欢迎加星跟随,有问题欢迎评论和指正😃
OK交代完毕，说下这回要完成的内容。
这回要做的是一个带缩放功能的滑动菜单(就是一个侧拉栏)和文章列表，以及文章的展示路由
使用`vuex`做状态管理控制`css`完成动画过度效果以及使用`vue-router`的嵌套路由功能。

** 滴滴滴！上车请刷卡！**
![](http://leenty.com/img/vue/shangche.jpg)

### 正文
首先，我们先把核心功能完成，也就是`vue-router`的嵌套路由功能 
#### 嵌套路由功能
有些时候我们会遇到一个模板重复使用的情况，注意我说的并不是一个子模板在其父模板上的重复，而是多个页面之间的使用到相同的父模板。
就好比有这么几个路径
* `vue2.leenty.com/article/demo1`
* `vue2.leenty.com/article/demo2`
* `vue2.leenty.com/article/demo3`
可以发现其中共有的部分`vue2.leenty.com/article`。
```
/article/demo1                 /article/demo2               /article/demo3
+------------------+           +-----------------+          +-----------------+
| article          |           | article         |          | article         |
| +--------------+ |           | +-------------+ |          | +-------------+ |
| | demo1        | |  +----->  | | demo2       | | +----->  | | demo3       | |
| |              | |           | |             | |          | |             | |
| +--------------+ |           | +-------------+ |          | +-------------+ |
+------------------+           +-----------------+          +-----------------+
```
没错，这个路径指向的就是父模板，他在多个子路由里被重复的渲染，如果我们没有对其做嵌套路由的处理，结果将是不仅我们写的累，vuejs渲染的也多余，因为这个模板被反复的使用却每次都被重新渲染。
so，我们开始做嵌套路由吧！
打开路由列表文件(`routes.js`)
tips:不要把`routes.js`和项目里的`router.js`搞混咯，一个是路由列表文件`routes.js`，一个是路由导出文件`router.js`
在里面我们假定有一个基础的路由（这个文件在本系列第二章里有讲到）
```js
const routes = [
  {
    name: 'Article',
    path: '/article',
    component: require('./components/Article.vue')
    // 这里因为书写以及以后做异步组件的方便，将原先的import导入的方式改成了require的方式
    // 这么做不会实质上没和之前没有变化的，只是单纯的写法不同。
  }
]

export default routes
```
好，接下来我们加入子路由，
目前本系列已经有五篇文章，那么现在一一加入进去。
当前的项目路径
```
src
├── main.js               # vuejs应用入口
├── router.js             # 路由导出文件
├── routes.js             # 路由列表文件
├── App.vue               # vuejs应用根模板
├── components
│   ├── Home.vue
│   ├── Article.vue
│   ├── Demo.vue
│   ├── ...               # 存放各个路由入口文件
│   └── templates         # 存放模板
│       ├── AppArticleList.vue    # 文章列表 
│       └── ...
└── store
│   ├── index.js          # 组装模块并导出 store 的地方
│   ├── actions.js        # 根级别的 action
│   ├── mutations.js      # 根级别的 mutation
│   ├── types.js          # mutation命名空间
│   └── modules
│       ├── demo.js       # demo模块
│       └── status.js     # 全局应用状态模块
└── md                    # 存放md文件
    └── articles          # 文章路径 
        ├── vue2-1.vue
        ├── vue2-2.vue
        ├── vue2-3.vue
        ├── vue2-4.vue
        └── vue2-5.vue
        (这里为了讲解方便，会将.md文件替换为.vue文件，)
        (效果是一样的只是怕读者有些乱，.vue文件你们尝试的时候可以写些东西)
```
嵌套路由时会在原有路由对象的基础上添加一个`children`的节点
代码如下：
```js
const routes = [
  {
    name: 'Article',
    path: '/article',
    // 父路由上尽量写绝对路径，不然可能会引起一些麻烦，
    // 有捣(xia)鼓(gao)精神的同学可以试试
    component: require('./components/Article.vue'),
    children: [
    // children节点：传入一个子路由数组，格式与父路由是一样的
      {
        name: 'vue2_1',
        path: 'vue2_1',
        // path: 导入的路径是相对路径，你不需要写全，如下的path将会被vuejs理解为：
        // '/article/vue2_1'
        // *** 注意： ***
          // 如果你写的是这样的相对路径，就千万别在前面加'/'，不然就意味着这是一个绝对路径
        component: require('./md/articles/vue2-1.vue')
      },
      {
        name: 'vue2_2',
        path: '/article/vue2_2',
        // 演示一个绝对路径，这样子的路径会被vuejs理解为其本意'/article/vue2_2'
        // 如果这里只写了'/vue2_2'的话，vuejs就会把路由理解为'/vue2_2'，
        // 不过不用担心他显示上的问题，只是url会有些有趣的区别
        // 你会发现虽然url变短了，但是父模板依然正常的显示着。
        component: require('./md/articles/vue2-2.vue')
      },
      {
        name: 'vue2_3',
        path: 'vue2_3',
        component: require('./md/articles/vue2-3.vue')
      },
      {
        name: 'vue2_4',
        path: 'vue2_4',
        component: require('./md/articles/vue2-4.vue')
      },
      {
        name: 'vue2_5',
        path: 'vue2_5',
        component: require('./md/articles/vue2-5.vue')
      }
    ]
  }
]

export default routes

```
嗯，好了，这样嵌套路由就建立好了

#### 对侧拉栏做状态管理
打开`src/store/modules/status.js`
代码如下
```js
import * as types from '../types'
// 引入命名空间，放置在types里

import getScrollData from '../../utils/scroll'
// 这是获得滚动数据的js文件，具体怎样写的可以去我github开源项目里看
// 导出的是一个方法，这个方法返回一个对象
// {
//    scrollTop: 0,
//    scrollHeight: 0,
//    windowHeight: 0,
//    scrollBottom: 0
// }

const state = {
  articleList: false,
  // 布尔值，表示侧拉文章列表的开关
  scroll: {
  // 滚动相关的数据
    scrollTop: 0,
    scrollHeight: 0,
    windowHeight: 0,
    scrollBottom: 0
  }
}

const getters = {
  // articleList: ({status}) => status.articleList
  // tips: 上面这种方法是错误的。这里的getters传入进来的不是state的根对象，
  // 而是当前的state对象，在这里也就相当于是state = state.status
  // 所以可以放心的用state
  articleList: state => state.articleList
  // 设置Getters，在.vue文件里可以使用mapGetters方法获得
}

const mutations = {
  [types.ARTICLE_LIST] (state) {
    state.articleList = !state.articleList
  },
  // 设置mutations，只有这个方法可以改变state
  [types.SCROLLDATA] (state, scrollObj) {
    state.scroll = scrollObj
  }
}

const actions = {
  articleListSwitch ({ commit }) {
    commit(types.ARTICLE_LIST)
  },
  // 设置actions,可以在这里做一些异步的工作，然后使用commit来调用mutations修改state
  pushScrollData ({ commit }) {
    commit(types.SCROLLDATA, getScrollData(), { silent: true })
    // 因为页面滚动触发频繁，会影响到我们平时的vuex的审查，所以这里选择静默提交
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
// 而后的.vue文件就可以调用辅助方法达到获取状态或者控制状态的目的了
```
调试vuex最好使用vuejs的谷歌插件[Devtools](https://chrome.google.com/webstore/detail/nhdogjmejiglipccpnnnanhbledajbpd)
或者去github[下载源码自己编译](https://github.com/vuejs/vue-devtools)
翻墙要梯子(vpn)，想翻墙没vpn的我这里安利一个vpn，没什么其他，因为我正用的就是这个。
贴一个云梯推荐码[http://referyt.com/?r=f688f08a26bf108d](http://referyt.com/?r=f688f08a26bf108d),通过推荐码注册可以优惠10元，笔者也可以得到10元优惠，在得到优惠的同时也是对我的鼓舞吧😂

#### 渲染链接列表
接下来要做的就是做链接跳转。
切到`AppArticleList.vue`文件，也就是文章列表页。
大家可以在我的Demo里点击左上角的菜单按钮看到这个列表
!(AppArticleList.vue)[/img/vue/AppArticleList.jpg]

里面的内容是这样子的
(因为内容有些复杂，为了看的清晰点这是我提取出来的核心部分)
(源文件可以看[https://github.com/leenty/vue2/blob/master/src/components/templates/AppArticleList.vue](https://github.com/leenty/vue2/blob/master/src/components/templates/AppArticleList.vue))
```html
<!-- 大致的内容就是渲染一个文章列表 -->
<template lang="pug">
  .articleList(:class="{'articleList--Active': articleList}").l-page--Full
    ul.articleList__content.u-ul--Reset
      li(
        v-for="(item, index) in list",
        // vuejs的for循环，list指向了data里的list数组(看js部分)
        :style="calcDelay(index)",
        // 绑定返回一个css延时代码(在methods方法下)
        // 主要功能是给菜单提供依次进入的动画效果
        @click="articleListSwitch"
        // 绑定点击事件，控制文章列表的出现和隐藏
      ).articleList__li
        router-link(
        // 通过list里的数据循环生成路由链接
          :to="{name: item.name}",
          // 绑定路由链接，这里用了{name: item.name}是因为相对来说，name比path方便
          // item就是之前for循环里的item
          active-class="articleList__link--Active"
          // 之前的文章的第二篇里对路由时匹配的`linkActiveClass`做了配置，
          // 这里用不到原来配置的class,所以可以用这个方法单独的做处理
          // 把匹配到的链接的class改成了'articleList__link--Active'
        ).articleList__link.u-borderBox.u-link__inherit.l-flexV--c
          .articleList__title
            svg.svg__home.u-va--tb
              use(xlink:href="#svg__articleIcon")
            // 这里用的图标是svg的,关于这种用法，如果有兴趣我可以专门的介绍一下
            | {{item.title}} 
            // 绑定链接的文字
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
// 导入vuex的两个将要用到的辅助方法
export default {
  // export defalut是es6的模块导出方法，这里导出一个默认模块，即是一个vue对象
  data () {
    // 这是一种es6对象字面量的缩写，指向一个函数
    // 扩展出来就是data: function data () {}
    return {
      // 而后在函数里去返回将要用到的数据
      // 这么做返回的数据可以使用this访问到
      list: [
        {
          name: 'vue2_1',
          title: 'vue2.0一起在懵逼的海洋里越陷越深（一）'
        },
        {
          name: 'vue2_2',
          title: 'vue2.0一起在懵逼的海洋里越陷越深（二）'
        },
        {
          name: 'vue2_3',
          title: 'vue2.0一起在懵逼的海洋里越陷越深（三）'
        },
        {
          name: 'vue2_4',
          title: 'vue2.0一起在懵逼的海洋里越陷越深（四）'
        },
        {
          name: 'vue2_5',
          title: 'vue2.0一起在懵逼的海洋里越陷越深（五）'
        }
      ]
    }
  },
  computed: mapGetters(['articleList']),
  // vue的计算方法对象,用法和data里的数据是一样的，
  // 这里使用了mapGetters辅助函数，用来获得vuex的Getters里的articleList
  // 这个方法会返回一个对象，所以如果没有其他计算方法的话直接赋值给computed就好了
  // 有的话可以向下面这样: 
  // computed: {
  //    demo () {
  //      return this.list[0].name
  //      在这里你可以使用this访问到data里的list
  //    },
  //    ...mapGetters(['articleList'])
  //    ...延展操作符，用于展开mapGetters得到的对象，使得与demo属性平级
  // },
  methods: {
    // vue的方法对象，你可以在这里写你的事件处理函数或是其他方法
    calcDelay: function (index) {
      // 这是分配css动画延迟量的函数
      return {
        'transitionDelay': `.${index + 2}s`
      }
    },
    ...mapActions(['articleListSwitch'])
    // 通过延展操作符,展开mapActions得到的actions对象
  }
}
</script>

<style lang="stylus">
  // css就不多说了
  @import '../../assets/stylus/preinstall'
  .articleList
    background-color c-master
  .articleList__content
    width s-articleList
    margin-top 8vh
    max-height 84vh
    color #fff
  .articleList__li
    transform translateX(-(s-articleList))
    transition transform .3s cb-duang .2s
  .articleList__link
    width 100%
    line-height 1.3em
    padding-left 10px
    min-height 50px
    background-color rgba(255,255,255,.1)
    &:hover
      background-color rgba(255,255,255,.3)
    svg
      transform-origin bottom center
      transform scale(.7)
  .articleList__link--Active
    background-color rgba(255,255,255,.4)
  .articleList--Active .articleList__li
    transform translateX(0)
  .articleList__title
    display block
    width 100%
    font-size 12px
    &:first-line
      font-size 14px
</style>
```
在写的过程中碰到了一个浏览器bug，这里还是说下
bug: 如果父元素进行了transform变换，那么子元素的position fixed将会失去作用,退化成position absolute
解决方案: 之前试过想要使用css的方式去绕过这个问题，但是发现不行，无奈使用了js去计算子元素退化成absolute后的差值，对其进行位移达到视觉的效果。
有兴趣的可以打开[http://vue2.leenty.com/article/vue2_2](http://vue2.leenty.com/article/vue2_2)然后审查元素，查看我的导航条也就是`.header__content`，这个时候你打开侧边栏然后上下滚动就会看到`.header__content`上js所不全的差值了

#### 装载嵌套路由
打开`article.vue`文件，文件很简单，内容如下：
```html
<template lang="pug">
.article
  h1.l-ta--c 文章页面
  .md-content
    router-view
    // 这个就是二级路由的装载点了
    // 之前的`APP.vue`的`router-view`会装载当前模板，而后的文章都会装载到这个点上。
</template>

<script>
  export default {
    data () {
      return {
      }
    }
  }
</script>

<style lang="stylus">
</style>
```

#### 关于触发滚动之后的一系列事件
关于触发滚动，考虑到之后可能会有多个页面需要使滚动方面的数据，所以就放在了vuex里作为状态的一部分。
所以滚动的监听就只需要监听一次就好了，多个地方的监听会浪费资源
最终，我把监听放在了`App.vue`里面,在里面监听'scroll'事件，然后放在vuex上，供有需要的组件去使用

```html
<template lang="pug">
  .app.u-clearfix
    app-article-list
    .app__content(
      :class="{'app__content--Active': articleList}",
      // 如果侧拉文章列表打开，那么添加这个class，相应的css效果将被触发
      @scroll="pushScrollData"
      // 绑定scroll事件
    ).l-page--Full
      home-header
      .app__bodyer.l-mH--auto
        router-view
    include ./assets/svg/all
</template>

<script>
  import HomeHeader from './components/templates/HomeHeader.vue'
  import AppArticleList from './components/templates/AppArticleList.vue'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    components: {
      HomeHeader,
      AppArticleList
    },
    computed: mapGetters([
      'articleList'
    ]),
    methods: {
      ...mapActions([
        'pushScrollData',
        'articleListSwitch'
      ])
    }
  }
</script>

<style lang="stylus">
  @import './assets/stylus/main'
  .app__menu
    background-color c-master
  .app__content
    overflow auto
    transition transform .5s
    box-shadow 0 0 100px 5px rgba(0,0,0,0.3)
    background-color c-bgc
    transform-origin s-articleList center
  .app__content--Active
    transform scale(.9) translateX(s-articleList)
  .app__bodyer
    max-width max-width
    background-color c-bgc
  @media screen and (max-width: max-width)
    .app__bodyer
      padding 0 10px
</style>
```
ok，这么个流程走下来，算是把`vuejs`,`vue-router`和`vuex`用在了一起

### 其他
[演示地址(http://vue2.leenty.com)](http://vue2.leenty.com)
[源码地址(https://github.com/leenty/vue2)](https://github.com/leenty/vue2)
[github主页](https://github.com/leenty),觉得靠谱的话欢迎加星跟随

