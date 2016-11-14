---
title: 使用BEM+emmet的css书写与命名技巧[未完]
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
BEM的意思就是块（block）、元素（element）、修饰符（modifier）
```css
.block {} // 顶级命名，代表了一类元素块或者一个模块
.block__element {} // 次级命名(使用两个英文下划线连接，后跟随次级名称，表示次级元素或属性)
.block--modifier {} // 状态命名(使用两个英文中划线连接，后跟随修饰符或状态名)
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

### BEM+emmet
相信很多同学有用过emmet,其前身就是大名鼎鼎的Zen coding
想了解的同学可以google一下emmet
而emmet对于BEM命名规范其实是有一套快速生成标签的规则的
发个栗子🌰
在emmet下这段代码
```html
form.search-form>input.-username+input.-password[type=password]+button.-submit--active|bem
```
按下`Tab`后会生成
```html
<form class="search-form">
    <input type="text" class="search-form__username">
    <input type="password" class="search-form__password">
<button id="J_Submit" class="search-form__submit--active"></button> <form>
```
如果仔细看第一段代码与第二段之间的区别就可以看出其中的奥义：
* 首个元素的class选择器会被作为BEM规则的头，后面的每一个以`.-`开头子元素编译后的class属性都将以这个头为开头
* 子元素可以以`.-`开头来代替父元素的class名，省去了重复书写的麻烦(即：`.-username`被编译成了`.search-form__username`)
* 子元素可以跟上`--`加修饰符来编译(即：`.-submit--active`被编译成了`.search-form__submit--active`)

这是一种快速生成标签的形式，方便的没话说
而有一部分同学已经不再直接写html标签了，而是使用了模板引擎了
我用的是pug（也就是之前的jade，现在已经更名为pug了）
模板引擎的好处是使整个结构看起来更加清晰有条理，也加快了编写页面的速度，
在使用模板引擎后就不在需要emmet了
but！
虽然不需要了，但是emmet的那种化繁为简的精神是可以继续存在滴，我特别喜欢这样的语法，
于是就开始了尝试在css命名上做研究

### 以下是我vue2.0Demo项目内有关css命名的部分
一开始看可能会有点懵逼，但是当看完6个小点再回头看eg就会明白了
```js
/**
 * css命名使用 BEM+emmet 风格作为命名规范
 * 
 * 约定[分类名称][属性|组件名称]与[属性名]使用小写
 * 约定[描述]与[状态]使用首字母大写
 * [eg]:
 *  .[分类名称]-[属性|组件名称][描述]--[属性值|状态]
 *    => .l-flexV--c
 *    => .b-base--Active
 * 
 *  1.约定 [分类名称] 缩写:
 *    • .layout => .l- (布局部分)
 *    • .utils => .u- (工具部分)
 *    • .button => .b- (按钮部分)
 *    
 *  2.约定通用 [属性] 缩写:(以emmet联想风格为缩写)
 *    • width => w
 *    • height => h
 *    • color => c
 *    • background => bg
 *    • margin => m
 *    • padding => p
 *    • border => bd
 *    
 *  3.约定通用 [组件名称]:(这里不使用缩写，
 *    因为组件名可以自定义，缩写易混淆，会增加记忆成本)
 *    • flex => flex (这里所指的是弹性盒子)
 *    
 *  4.约定通用 [描述] 缩写:(以大写)
 *    • horizontal => H
 *    • vertical => V
 *    • normal => N
 *    
 *  5.约定通用 [属性值] 缩写:(以属性前缀 '--' + emmet联想风格为缩写)
 *    • center => --c
 *    • middle => --m
 *    • space-around => --sa
 *    
 *  6.约定通用 [状态] 缩写:(以属性前缀 '--' + 状态首字母大写，
 *    这里不使用缩写，因为状态名可以自定义，缩写易混淆，会增加记忆成本)
 *    • active => --Active
 */
```
因为是一边写vue2.0-demo项目一边写文字，所以以上是暂定的部分，后续有更新会及时在这里更新


