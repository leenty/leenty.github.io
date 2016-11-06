---
title: gulp实现hexoMarkDown同步编译
date: 2016-05-14 17:02:07
tags: gulp
---
**作为一个前端，作为一个具有捣(zhuang)鼓(bi)精神的前端，心想着得有一个可以写写技术文章的地方呀！于是就开始玩起了hexo。**

虽然说Markdown设计之初就是为了方便作者快捷的写作。但是作为一个有强迫症的前端，写了一段总想看看写成了什么样子，但无奈看一眼得切到命令行bash输入
``` javascript
hexo generate //缩写 hexo g
```
在hexo编译完成后又切到浏览器刷新查看。心想，这不行啊，这样子怎么对得起捣(zhuang)鼓(bi)精神。于是就想着在里面加入gulp的想法。话不多说，下面就上代码。

## 安装gulp
和hexo一样gulp也是需要全局安装的
``` bash
npm i gulp -g
```

## 安装gulp-shell
gulp并没有hexo的组件，所以这里选择使用gulp-shell来实现。
``` bash
npm i -D gulp-shell
```

## 编写gulpfile.js文件
新建并打开gulpfile.js
``` bash
vim gulpfile.js
```
编写gulp代码,引入gulp、gulp-shell和gulp-notify
``` javaScript
var gulp = require('gulp');
var shell = require('gulp-shell');//bash输入
var notify = require('gulp-notify');//系统通知
```
编写默认任务
``` javaScript
gulp.task("default",function(){
  gulp.src("./public/index.html")
    .pipe(shell([
      'hexo g'
    ]))
    .pipe(notify('hexo编译完成！'));
});
```
可以在bash里使用`gulp`来启动默认任务

之前有用过gulp的同学可能会发现我gulp的src方法获取的地址只是一个文件，而且也没有指向source文件夹下的.md文件，这是因为这里根本不需要src方法来得到文件流。这里需要的只是其后的pipe方法来运行shell方法。
然而gulp-shell还提供了另一种方法来执行
``` javaScript
gulp.task('default', shell.task([
  'hexo g'
]));
```
只是这样的方法却是不能接pipe方法也就不能使用notify的系统通知了。权衡之下，我选择了前者。

## 编写watch任务
watch任务会监听指定文件的变更来触发默认任务
``` javaScript
gulp.task('watch',function(){
  gulp.watch("./source/*/*md",['default']);
})
```
在bash里使用`gulp watch`来启动watch任务
在编写完watch任务后，尽管已经解决了自动构建，但是本地调试却需要另一个bash界面来开启hexo的服务。
于是，我还需要一个server任务来启动服务

## 编写server任务
``` javaScript
gulp.task('server',shell.task([
  'hexo server'
]));
```
在bash里使用 `gulp server`来启动server任务
于是这里就可以改写watch任务
``` javaScript
gulp.task('watch',function(){
  gulp.start('server');
  gulp.watch("./source/*/*md",['default']);
})
```
这样就可以在启动watch任务的时候也开启本地服务了。
到了这一步，就可以在bash命令行输入
``` bash
gulp watch
```
回车后就可以开始边写边看了

**这里还缺少了自动刷新的功能，这个功能使用我之前的方法并不能起到作用，还需要再思考思考**

好了，我的第一篇技术文章就这么结束了，哈哈。


