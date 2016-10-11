---
title: zz的我和hexo多说配置
date: 2016-10-08 00:04:33
tags:
---
### 在_config.yml中添加多说的配置：
**(⚠️注意：_config.yml在根目录和主题根目录都会存在，主题目录下的文件信息将会覆盖根目录的文件信息)**
```
duoshuo: 你站点的short_name
duoshuo_shortname: 你站点的short_name
```
修改`themes\landscape\layout\_partial\article.ejs`模板
**把**
```bash
<% if (!index && post.comments && config.disqus_shortname){ %>
  <section id="comments">
    <div id="disqus_thread">
      <noscript>Please enable JavaScript to view the <a href="//disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
    </div>
  </section>
<% } %>
```
**改为**
```bash
<% if (!index && post.comments && config.duoshuo_shortname){ %>
  <section id="comments">
    <!-- 多说评论框 start -->
    <div class="ds-thread" data-thread-key="<%= post.layout %>-<%= post.slug %>" data-title="<%= post.title %>" data-url="<%= page.permalink %>"></div>
    <!-- 多说评论框 end -->
    <!-- 多说公共JS代码 start (一个网页只需插入一次) -->
    <script type="text/javascript">
    var duoshuoQuery = {short_name:'<%= config.duoshuo_shortname %>'};
      (function() {
        var ds = document.createElement('script');
        ds.type = 'text/javascript';
        ds.async = true;
        ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
        ds.charset = 'UTF-8';
        (document.getElementsByTagName('head')[0] 
         || document.getElementsByTagName('body')[0]).appendChild(ds);
      })();
      </script>
    <!-- 多说公共JS代码 end -->
  </section>
<% } %>
```
### 同时使用多个deployer
单个deployer的时候的 _config.yml
```
deploy:
  type: git
  repo: git@github.com:leenty/leenty.github.io.git
  branch: master
```
而换成多个deployer的时候需要在前面加`-`
```
deploy:
- type: git
  repo: git@github.com:demo/demo.github.io.git
  branch: master
- type: git
  repo: git@git.coding.net:demo/demo.git
  branch: master
```

