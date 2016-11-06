---
title: hexo 基础操作
date: 2016-05-07 14:36:28
tags: hexo
---
# 安装hexo

``` bash
命令：npm install-g hexo
```

创建项目文件夹 eg: leenty.github.io
 
进入文件夹 初始化hexo

``` bash
命令：hexo init
```

几秒钟后你的hexo项目就创建好了

接下来就可以看看这个项目了，在此之前需要先生成静态页面。
使用new来创建文章
```bash
命令：hexo new [layout] <title>
```
新建一篇文章。如果没有设置 layout 的话，默认使用 _config.yml 中的 default_layout 参数代替。如果标题包含空格的话，请使用引号括起来。

``` bash 
命令：hexo generate (缩写：hexo g)
```

进入文件观察模式，实时编译你的文章
```bash 
命令：hexo generate --watch (缩写：hexo g -w)
```

开始本地预览服务
```bash
命令：hexo server
```
指定地址开启预览
```bash
命令：hexo server -i localhost -p 4000
```

部署
```bash
hexo deploy (缩写：hexo D)
```

## 进阶：
利用package.json的scripts来搞点事情
```javaScript
"scripts": {
    "server": "hexo server -i localhost -p 4000",
    "watch": "hexo g -w",
    "deploy":"hexo D",
    "dev": "npm run server && npm run watch"
}
```
将上述代码写在package.json里，就可以通过```npm run server```来开启服务
通过```npm run watch```来启动文件观察模式
通过```npm run deploy```来部署博客
当然，最最主要的是可以通过```npm run dev```同时开启服务和观察模式


