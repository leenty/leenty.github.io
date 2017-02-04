---
title: vue2.0一起在懵逼的海洋里越陷越深（三）
date: 2016-11-27 22:51:49
tags: [vuejs, vue-router]
---
<!-- [](https://chrome.google.com/webstore/detail/markdown-here/elifhakcjgalahccnjkneoccemfahfoa/related) -->
本文章系列：[vue2.0一起在懵逼的海洋里越陷越深 (http://leenty.com/tags/vuejs/)](http://leenty.com/tags/vuejs/)
前面写了vue-router组件的初步用法，原来这次想写vuex的，但是想想还是先继续把vue-router写完吧🤔
![vue2.0](http://leenty.com/img/vue/chiss.jpg)

### 上回说到: vue-router的基本用法，下面继续深入
啊不！是继续向着懵逼海洋的海底继续下沉，哈哈哈哈
前面已经设置了两个路由，一个是首页，一个是文章页，现在在开一个演示页的路由
首页以后顶多就展示下大致的新内容，文章页顶多放放文章详情
这演示页可就厉害了，接下来的一些演示都会放在这里，具体的布局还没想好，先这么用着吧！

### vue-router的超链接标签“router-link”
在vue1.0版本的超链接标签还是原来的`a`标签，链接地址由`v-link`属性控制(具体的这里也不多说了，vue1.0已经过去啦)
而vue2.0版本里超链接标签由`a`标签被替换成了`router-link`标签，当然，没有必要不用担心什么，因为最后没有什么特殊的设置的话，`router-link`标签还是会被渲染成`a`标签的。
至于为什么在vue2.0的时候被替换成了`router-link`标签呢？
大致YY了下，部分情节应该是这样的：

* 最主要情况，在上个版本中，链接只能以`a`标签的形式存在，不能满足一些特殊的要求，比如在列表(`ul>li`)下，你需要为在里下面再加上一个`a`链接才能完成点击列表跳转页面，so2.0版本中路由从`a`标签变成了可以任意渲染成各种元素的`router-link`标签，如此一来，就可以直接渲染成`li`标签，省下了`a`标签(具体怎么做下面会统一说明)
* 为什么不直接使用正常`a`标签写法做链接跳转呢？当点击正常的`a`链接时，就会感觉到页面跳转时的页面刷新重载的感觉，因为这个`a`标签并没有被vue-router所监听到事件的触发，所以就会发生正常的页面跳转，所以页面就会重载。那是传统的网页上才会发生的事。使用了vue-router组件所提供的`router-link`后，页面内的a标签就会被vue所监听，以便在用户点击链接的时候阻止浏览器的默认跳转行为，而转为无刷新加载的方式。当然这只作用于自己的站点内。

### “router-link”标签的属性(Props)
没错，只要是标签，多多少少都是有属性的，最次class和id属性也是可以添加的。
下面说说`router-link`标签的各个属性

#### “to”属性
`to`属性最简单的用法就是如`a`标签里的`href`属性一样的填写，简单粗暴，想去哪就去哪。
其实，`to`属性的值可以有两种：

** 其一为字符串形式，也就是前面说到的如`href`一样的用法 **
```html
<!-- 字符串 -->
<router-link to="/article">Article</router-link>
<!-- 渲染结果 -->
<a href="/article">Article</a>
```

** 其二为对象形式，下面看看to属性的 对象的主要结构 **
```js
// 主要结构
{
  name: 'Article'
}
  // 或者
{
  path: '/article'
}
// 二者选其中之一，如果两种都使用，那么vue会选择使用name字段
// eg
{
  name: 'Article',
  path: '/demo'
}
// 实际效果等同于:
{
  name: 'Article'
}
```
对于里面的`path`字段，其实就是就是想去哪就去哪的to属性字符串的对象形式
至于`name`字段，是不是会有些懵逼？这个`name`其实就是上一篇里说到的`routes.js`文件里的`name`字段啦！
就是这个！填成一样的就好啦！注意大小写哦
![routes.js-name字段](http://upload-images.jianshu.io/upload_images/2005796-74c28829c2945707.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

** to属性的 对象的可选结构 **
```js
{
  name: 'Article', // 与path字段二选一
  path: '/article', // 与name字段二选一
  params: { // 可选字段 隐性的传递参数(多用来页面传参)
    userId: 123 // 传递的参数demo
  },
  query: { // 可选字段 查询参数，就是url里‘?’之后的部分
    plan: 'private' // 查询参数demo
  }
}
```
可以使用chrome插件[vue.js devtools](https://chrome.google.com/webstore/detail/nhdogjmejiglipccpnnnanhbledajbpd)来查看vue的路由的params参数，安装这个插件需要翻墙下载
或者可以去[github上下代码编译插件](https://github.com/vuejs/vue-devtools),如果觉得麻烦也可以百度去其他网站下
对于可选参数是不是会有些懵，下面贴几张图就明白了
![查看路由参数](http://upload-images.jianshu.io/upload_images/2005796-ad7396a60ead7e5c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
其中`params`是隐性传递，`query`是显性传递。
![路由query](http://upload-images.jianshu.io/upload_images/2005796-f8f925d9b68e6367.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
红框部分就是传递的`query`了

#### “replace”属性
顾名思义，replace是替换的意思，所以在`router-link`标签添加了这个属性后，页面切换时不会留下历史记录
```html
<router-link :to="{ path: '/abc'}" replace></router-link>
```

#### “append”属性
append会把当前路径设置为相对路径，何为相对路径？比如你当前在`vue2.leenty.com/demo`下，点击这个链接`<router-link :to="{ path: 'article'}" append></router-link>`,如果没带`append`属性，那么就会跳到`vue2.leenty.com/article`下(hash模式下是`vue2.leenty.com/#/article`)，而现在却是跳到了`vue2.leenty.com/demo/article`下。这个属性用处不是很大，在特殊情况下才会用到。
推荐还是把自己地址写全，不要使用相对地址，这样容易搞错
另外加个小技巧，在地址前加`/`能保证是跳转根目录的

#### “tag”属性
具有`tag`属性的的`router-link`标签会被渲染为相应的标签
```html
<router-link to="/article" tag="li">article</router-link>
```
将会被渲染为
```html
<li>article</li>
```
这里不需要担心li的跳转问题，vue会自动为其绑定点击事件，并跳转页面

#### “active-class”属性
这个属性如字面意思上说的，是设置激活链接时的`class`属性
即是当前页面所有与当前地址所匹配的链接都会被添加这个`class`属性
```html
<router-link to="/article" active-class="u-link--Active">article</router-link>
```
如此，在`vue2.leenty.com/article`页面下(hash模式下是`vue2.leenty.com/#/article`)就会被渲染为
```html
<a href="/article" class="u-link--Active"></a>
```
`active-class`属性的默认值是`router-link-active`,所以如果没有设置，就会被渲染为这个class

其实在上一章节有说到统一的设置这个active-class属性
打开`router.js`文件就能看到
```js
const router = new VueRouter({
  mode: 'hash',
  linkActiveClass: 'u-link--Active', // 这是链接激活时的class
  routes
})
```

#### “exact”属性
开启`router-link`的严格模式
```html
<router-link to="/" exact>home</router-link>
```
上面这个标签如果不加`exact`属性，则会在`vue2.leenty.com/article`页面下也会被匹配到，
这却不是我们的本意,在加了这个属性后就会正确的匹配到`vue2.leenty.com`下

以上为vue-router的router-link的介绍