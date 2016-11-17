---
title: vue2.0一起在懵逼的海洋里越陷越深（二）
tags:
---
承接上文[vue2.0一起在懵逼的海洋里越陷越深（一）](/2016/10/21/vue2-1/)
### 说好了一起懵逼，那么我们继续下沉
在上一篇里已经将vue2.0需要的依赖都装齐了
那么接下来
![](http://upload-images.jianshu.io/upload_images/2005796-3fc063c8fb0b1fba.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
因为vue最后生成的页面看似静态页面(对于静态页面这里有些偷鸡用法，不管你怎样，反正我已经露出了诡异的微笑😏，再贴一个[vue2.0 demo的项目地址](https://github.com/leenty/vue2)，大爷有兴趣可进去看看演示，开心了就加个星)，其实却是个webApp
没错！就是一个webApp

### 作为一个webApp，当然有不同的地方
webApp与传统网页区别的地方是webApp具有前端路由，当然这是众多不同之一，这篇只说前端路由。
上一篇中有安装vue-router组件，这个就是vue的前端路由

### 前面搞了半天，现在要开始coding啦！
好的，用自己的小编辑器打开vue项目（我用的是sublime）
可以看到项目目录是这样子的
![项目目录](http://upload-images.jianshu.io/upload_images/2005796-74ad413582222174.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
(插一句，如果喜欢这个sublime主题可以[查看这篇文章](/2016/10/06/sublime-material-theme/))


