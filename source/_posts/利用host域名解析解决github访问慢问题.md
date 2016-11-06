---
title: 利用host域名解析解决github访问慢问题
date: 2016-10-14 22:57:09
tags: other
---
### 起因
最近家里访问github速度越来越慢，今天已经是异常的慢了，于是开始寻找解决的办法
遇到打不开的网站，本能的搬起‘梯子‘去翻墙，问题就这么解决了。。。
***不对啊！我去！***
***github什么时候需要翻墙访问啦？***
### so
我开始寻找不翻墙的方法。
先看这张图
![github-network](/img/github-network.png)
发现其实github.com的响应速度并不慢，而真正拖慢速度的是assets-cdn.github.com（其中pending的部分）
这基本是由dns污染所导致，所以只要通过host映射到一个畅通的IP上就会变的好起来。
进入一个[dns域名检测](http://tool.chinaz.com/dns)的网站，在其中查询assets-cdn.github.com
会搜出一个dns列表，选择其中TTL值最小的一个IP，复制出来
命令行工具打开你的hosts文件（这里以macOS为例,如果你使用windows的git命令行工具，操作就是差不多的）
```bash
sudo vim /etc/hosts
```
在hosts文件最下方添加刚刚复制出来的IP
```bash
151.101.xxx.xxx assets-cdn.github.com
```
**具体vim操作步骤：**
1. 按下`shift + g`跳至页尾
2. 按下`o`创建新的一行
3. 按下`ctrl/command + v` 粘贴刚刚复制的IP
4. 而后打个空格
5. 接着输入`assets-cdn.github.com`
6. 按下`esc`退出编辑模式
7. 输入`:wq`保存退出
如此就大功告成了。
如果还不会用vim，也可以用其他编辑器打开做修改。
保存之后，就可以尝试再次访问github了，多刷几遍就能进去。
如果还是进不去可以输入命令`sudo dscacheutil -flushcache`更新dns缓存，这样就可以进入了。

