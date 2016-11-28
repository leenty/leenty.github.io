---
title: vue2.0一起在懵逼的海洋里越陷越深（二）
date: 2016-11-20 23:41:16
tags: [vueJs, vue-router]
---
承接上文[vue2.0一起在懵逼的海洋里越陷越深（一）](/2016/10/21/vue2-1/)
### 说好了一起懵逼，那么我们继续下沉
在上一篇里已经将vue2.0需要的依赖都装齐了
那么接下来
![](http://upload-images.jianshu.io/upload_images/2005796-3fc063c8fb0b1fba.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
因为vue最后生成的页面看似静态页面(对于静态页面这里有些偷鸡用法，不管你怎样，反正我已经露出了诡异的微笑😏，再贴一个[vue2.0 demo的项目地址](https://github.com/leenty/vue2)，大爷有兴趣可进去看看演示，开心了就加个星)，其实却是个SPA(单页面应用)
没错！就是一个SPA

### 作为一个SPA，当然有不同的地方
SPA与传统网页区别的地方是SPA具有前端路由来模拟页面跳转，当然这是众多不同之一，这篇只说前端路由。
上一篇中有安装vue-router组件，这个就是vue的前端路由
vue + vue-router简直是爽，页面跳转的速度简直是不要不要的
不光是用户体验上的提升，作为一名开发者，在使用了如vue，react等这类MVVM框架后，就不会再想回到jQuery的时代了。

### 前面搞了半天，现在要开始coding啦！
好的，用自己的小编辑器打开vue项目（我用的是sublime）
可以看到项目目录是这样子的
![files-tree](http://upload-images.jianshu.io/upload_images/2005796-e8d30c83712c89f2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
(插一句，如果喜欢这个sublime主题可以[查看这篇文章](/2016/10/06/sublime-material-theme/))
与自己的目录对比发现少几个文件，那是没有什么关系的，接下来要做的就是去创建这些文件。

### 作为一个SPA，首先要有路由
从目录图片里可以看到`main.js`这个文件，没错这个就是程序的入口
这个文件的内容是这样的
```js
import Vue from 'vue'
import router from './router'

import App from './App'

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
```
[`main.js`地址](https://github.com/leenty/vue2/blob/master/src/main.js)
这里用的是ES6的语法，使用`import`来导入包
这里导入了vue包，还有两个文件，分别是`router.js`和`App.vue`
`.js`后缀是可以省略的(毕竟是亲生的，你不说导入什么类型的文件，肯定是自家人毕竟亲呀)
其实`.vue`后缀也是可以省略的，我建议还是写一下，如果遇到两个同名文件就尴尬了。

好的，这个`router.js`就是路由的输出口啦，
`App.vue`就是目录里已经存在的那个模板文件啦，你的界面就从这里开始啦。
引入了包就可以开始设置路由和挂载模板了

顺带一提，可以看到在`new Vue()`时传入了一个对象，但是这个对象却不是键值对，
是这样，这是ES6的一种语法，当引用的变量名和键名相同时，就可以简写成这样
如果还原来是这样的
```js
new Vue({
  router: router,
  render: h => h(App)
}).$mount('app')
// 被简写成了
new Vue({
  router, // 这是ES6对象的简写，扩展开就是router: router
  // 箭头函数(=>)是ES6的新语法
  render: h => h(App) // 这里扩展开就是render: (h) => { return h(App) }
}).$mount('app')
```
PS：ES6的新语法现在网上文章已经有很多了，我之后也会发一版常用的语法

### 那么现在在src目录下创建`router.js`文件
内容是这样的：
```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

// 告诉vue要使用router
Vue.use(VueRouter)

/* eslint-disable no-new */
// 实例化router对象
const router = new VueRouter({
  mode: 'hash', // 设置路由模式 可选值: "hash" | "history" | "abstract"，默认"hash"
  linkActiveClass: 'u-link--Active', // 这是链接激活时的class
  // base: '/app/', // 这个是设置根目录路径，一般用不到，默认'/'
  routes // 挂载路由集合 后面会说
})
// 导出router对象
export default router
```
[这是`router.js`地址](https://github.com/leenty/vue2/blob/master/src/router.js)
这里引入了两个包`vue`,`vue-router`和一个包含路由集合的`routes.js`文件
整个文件的逻辑就是，使用`Vue.use()`方法告诉vue我们使用了路由
然后就大大方方的导出路由对象
![main.js router](http://upload-images.jianshu.io/upload_images/2005796-ebc26fa935c8cf9a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
这个时候`main.js`里就可以接受到这里导出的路由对象，并挂载到vue对象上

### 在src目录下创建`routes.js`文件
`routes.js`是用来放置路由集合的文件
其实路由集合是可以写在`router.js`里的，这里为什么不写在一起呢？
因为当路由集合变得庞大时，如果还是写在`router.js`里，就会显得拥挤，不便于阅读
所以这里推荐单独写出来。
同时呢也可以创建路由所对应的模板文件(`.vue`文件，我把它称为模板文件)，`Article.vue`和`Home.vue`
模板文件叫什么名由自己决定，于是就能看到这张图里所有文件都齐了
![files-tree](http://upload-images.jianshu.io/upload_images/2005796-e8d30c83712c89f2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

那么在编写`routes.js`文件之前，需要先写好两个模板的内容(不然一会有没有成功都不清楚了，23333)

好的，贴一下`home.vue`的内容
```html
<template lang="pug">
.home
  h1.l-ta--c Material Desgin
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
vue模板是html结构的，这也是对界面编写最友好的方式
里面的`<template> </template>`标签就是视图
`<script></script>`就是js，这个没有争议
`<style></style>`是写css的，这个也没有问题
但是当仔细看我的代码，发现里面html使用了pug，css使用了stylus
其实不用他们也是可行的，只是用pug和stylus写结构比较清晰
不用也可以的
如果要使用，请打开你的终端，给项目添加几个包
```shell
npm i pug stylus stylus-loader -D
```
里面的css的class(`.l-ta--c`)看着有点懵逼的，可以看看[使用BEM+emmet的css书写与命名技巧](http://www.leenty.com/2016/11/06/css书写与命名技巧/#main)
好的，模板不需要太复杂，只要有字能显示就好了，至于`Article.vue`也是一样的，这里就不贴了

Tips：模板里推荐有一个根元素，就像这里的`.home`就是根元素，这样不容易混乱，结构会清晰

### 写好了模板就可以开始编写`routes.js`了
先贴代码!
```js
// 导入之前写好的两个模板
import Home from './components/Home.vue'
import Article from './components/Article.vue'

// 编写路由集合
const routes = [
  {
    name: 'Home', // 路由名，这个字段是可选的
    path: '/', // 路由路径，这里是根路径所以是'/'
    component: Home // 模板
  }, // 这些是常用的
  {
    name: 'Article',
    path: '/article',
    component: Article
  }
]
// 导出路由集合
export default routes
```
[然后是文件地址](https://github.com/leenty/vue2/blob/master/src/routes.js)
最后导出了路由集合(`routes`)后就可以在`router.js`里使用了
于是，前面的`router.js`里的`routes`就有了。

### 现在进行最后一步，到`App.vue`里添加路由
代码如下：
```html
<template lang="pug">
  .app
    header
      //- 制作一个跳转链接
      //- 这里不要直接用a链接跳转，那样会导致页面重载，
      //- 相比之下用router-link是高效的方案
      //- to属性就是链接的地址啦
      router-link(to="/") home
      router-link(to="/article") article
    bodyer
      //- 路由地址所对应的模板将会被挂载到router-view标签上
      router-view
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
[地址](https://github.com/leenty/vue2/blob/master/src/App.vue)
好了，到此为止就完成了路由搭建与使用了。


