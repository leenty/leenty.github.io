---
title: css书写与命名技巧[未完]
date: 2016-11-06 23:57:50
tags: css
---
于日常的项目中，小型项目还好，css即使没怎么规划也不至于特别的乱，但一旦项目里css有一定的基数时，css就会显得混乱起来。
于是。。。
### 可能就遇到了这种情况:
#### 情况1.
哎呀！这个地方布局有点问题，我改一下，于是看到了一堆css选择器，当你想要修改某个class时又害怕会影响到其他在使用这个class的组件，于是就很尴尬的又写了一个class加在上面。
    
#### 情况2.

css命名冲突，你将要命名的class命已经被使用，更惨的是其他意思相近的命名单词也被使用了，这下就词穷了🤕
#### 情况3. 
毫无意义的命名：(写的时候class的意思只有自己和上帝知道，现在只有上帝知道了🙆🏻)
```css
.abc {
    width: 200px;
}
```
其他前端：一脸懵逼
### 针对上面的问题，于是就在命名上开始做出改变，然而却😟
#### 情况4.
过于语义化的命名（这里举个略微夸张且有些不恰当的栗子🌰）    
```css
.navigation-width-full-line{
    width: 100%;
    height: 50px;
}
``` 
这样是把意义描述清楚了，但是命名却是过长了
#### 情况5. 
有语义却不够直接简洁的命名    
```css
.navigation-responsive{
    flex: 1 1 10%;
}
```
这样无形中增加了记忆成本

### 命名规范 BEM
BEM是我很喜欢的一个命名规范
命名规则简单直接又不至于混乱
```css
.block {} // 顶级命名，代表了一类元素或者一个模块
.block__element {} // 次级命名(使用两个英文下划线连接，后跟随次级名称，表示次级元素或属性)
.block--modifier {} // 状态命名(使用两个英文中划线连接，后跟随状态名)
```
这样的写法可以的好处是可以避免css的嵌套，可以加快css渲染时的速度
** 栗子🌰 **
```html
<!-- 旧版命名 -->
<div class="person">
    <div class="head"></div>
    <div class="body"></div>
    <div class="foot"></div>
</div>
<div class="pug">
    <div class="head"></div>
    <div class="body"></div>
    <div class="foot"></div>
</div>
<style>
    // css选择时需要两个class
    .person .head {
        width: 100px;
    }
</styles>

<!-- BEM命名 -->
<div class="person">
    <div class="person__head"></div>
    <div class="person__body"></div>
    <div class="person__foot"></div>
</div>
<div class="pug">
    <div class="pug__head"></div>
    <div class="pug__body"></div>
    <div class="pug__foot"></div>
</div>
<style>
    // css选择时只要一个class
    .person__head {
        width: 100px;
    }
</styles>
```

