---
title: git入门级--在github创建项目
date: 2016-06-02 21:42:13
tags:
---
## git分布式版本控制系统
我第一个接触的版本控制系统是svn，当时觉得版本控制就是这样，直到我遇到了git...
git是分布式版本控制系统，合适分布式开发，强调个体。速度快、灵活，代码冲突了也比较好解决，最让我喜欢的还是git的分支切换。
## 在github上创建一个空项目
我这里git的远程仓库选择[github](https://github.com/)，github是全球最大的代码托管库，在国内也有许多类似的站点可以选用（比如：[coding](https://coding.net)）。
* 这里假定已经有了github账号。登录github点击右上角的加号，选择new repository选项新建一个项目。
![新建项目](http://upload-images.jianshu.io/upload_images/2005796-cd1f6f307fea4726.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

* 填写新项目的基本信息：
新的项目名称，描述，其他默认，然后点击create repository按钮新建项目
![填写新项目基本信息](http://upload-images.jianshu.io/upload_images/2005796-6bf678d065940f59.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

* 克隆新项目至本地
点击README按钮，去编辑README文件。
![新建README文件](http://upload-images.jianshu.io/upload_images/2005796-40f60ac69c4afd6a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
写下hello world，然后到页面最下方点击commit new file按钮。
![hello world](http://upload-images.jianshu.io/upload_images/2005796-48f7ddbdb33cd78e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
点击use https 然后点复制按钮
![复制](http://upload-images.jianshu.io/upload_images/2005796-0d177247118d3038.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
去你的本地文件夹，打开git bash。输入命令
```bash
git clone <刚才复制的项目地址>
```
![git bash](http://upload-images.jianshu.io/upload_images/2005796-ec0fa26bc9843e66.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
如果还没安装git，可以自行百度[下载git](https://www.baidu.com/link?url=3rT5SSGCqN8J3w0rw8T7fHKvTEZ6NiYfDK5sxYGK5GCTeEp3A0ufmhe8YVi0-zGiMpcEIk2ibq0s1J-z_Ys8x5VLcpDCwbgvNEE7RBVBj6O&wd=&eqid=a85caa0700009e1500000004575021d8)，安装无脑，一路下一步就好。
到此为止，新的项目就好了。
![Paste_Image.png](http://upload-images.jianshu.io/upload_images/2005796-9f00c74a78fa4d75.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 提交 (commit)
进入新建的项目文件夹，就可以开始你的代码了。
![demo文件夹](http://upload-images.jianshu.io/upload_images/2005796-24afb72cb0496765.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
这里为了方便，假定已经在项目里写了一段代码。准备提交至远端代码仓库。进入项目文件夹，输入命令：
```bash
 git status
```
![git status](http://upload-images.jianshu.io/upload_images/2005796-6d946ed08091f3fb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
添加更改的代码
```bash
git add .
```
![git add .](http://upload-images.jianshu.io/upload_images/2005796-e40153954f71e885.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
提交代码
```bash
git commit -m "提交代码"
```
![提交代码](http://upload-images.jianshu.io/upload_images/2005796-96ce5cd702905509.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
log命令可以查看提交历史
```bash
git log
```
![Paste_Image.png](http://upload-images.jianshu.io/upload_images/2005796-869b30a6c9cff67e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 推送提交至远程分支push
```bash
git push origin master
```
![push](http://upload-images.jianshu.io/upload_images/2005796-bff28f8a53e97a0f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
至此就完成了git的首次提交
![](http://upload-images.jianshu.io/upload_images/2005796-c1d96cf942bd63ac.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 补充
这里使用的bash是[git(戳这里下载)](https://www.baidu.com/link?url=3rT5SSGCqN8J3w0rw8T7fHKvTEZ6NiYfDK5sxYGK5GCTeEp3A0ufmhe8YVi0-zGiMpcEIk2ibq0s1J-z_Ys8x5VLcpDCwbgvNEE7RBVBj6O&wd=&eqid=a85caa0700009e1500000004575021d8)自带的，如果觉得打命令搞不懂，可以试试图形化界面(例如：sourcetree)