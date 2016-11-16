---
title: 使用纯css制作有炫酷交互的按钮
date: 2016-11-16 21:19:16
tags: css
---
### 前端是一门入门简单，真正精通却不那么容易
就css来说，会使用css做页面布局也只是第一步，css远比想象中的要强大。

js很多效果都可以利用css各种属性和伪元素，制作出来，而且比起js还要方便快速

这是一个菜单按钮的效果，成为焦点后会变成一把叉，在焦点移除后会还原会菜单形状
这时就可以配合js做状态管理写出一个完整的下拉菜单或者侧拉菜单了
之后也会使用在我的vue2.0项目中，如果爷您有兴趣可以[移步到项目地址处视察视察](http://vue2.leenty.com)

具体的效果是这样的
![rotate menu button by css](http://upload-images.jianshu.io/upload_images/2005796-564670324f24a925.gif?imageMogr2/auto-orient/strip)
<iframe height='265' scrolling='no' title='rotate menu button by css' src='//codepen.io/leenty/embed/PbGpEg/?height=265&theme-id=0&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='http://codepen.io/leenty/pen/PbGpEg/'>rotate menu button by css</a> by leenty (<a href='http://codepen.io/leenty'>@leenty</a>) on <a href='http://codepen.io'>CodePen</a>.
</iframe>
[这里是menu按钮的演示地址](http://codepen.io/leenty/pen/PbGpEg)

写代码要信奉“能偷懒就偷懒”原则，在保证实现效果的基础上，绝不多写一个标签，多写一段代码
所以上面的效果咋一看需要至少4个标签才能写完，其实只用了一个标签
用button标签做父元素，用两个伪元素做两个横杆
问：“那还有一个横杆呢？”
是这样，通过观察效果图，发现其实由菜单图标变换到X图标只需要其中的两个横杆。
所以第三个横杆我使用了box-shadow属性来模拟，说到底，其实第三个横杆只是第二个横杆的投影而已

核心使用
* 属性：`transform-origin`, `transform`, `box-shadow`, `transition`
* 伪元素：`:before`, `:after`

代码标签是用pug语法写的，css是stylus语法写的，这两种语法都比较简单，如果会使用css选择器就可以看懂
下面也会简单的说明下

话不多说，上代码
```js
button#btn.b-menu
// pug语法里的'#'和'.'同css里一样'#'为id，'.'为class
label(for="btn") click
// 除了id与class以外的属性要如上面的形式写在括号里
    
// 这里扩展出来就是
// <button id="btn" class="b-menu"></button>
// <label for="btn">click</label>
```

```css
// stylus是css的预编译器的一种，简化了css的写法，结构更加清晰
// 这里就不过多的陈述了，有疑问可以下方留言询问
 
// 先去除button的默认样式
button
  border none
  outline none
  box-shadow none
  background none
  color currentColor
  padding 0
  cursor pointer
 
// 关键的部分开始了
.b-menu
  width 25px
  height 25px
  position relative
  &:before, // before是第一横杆，after是第二个横杆
  &:after // stylus里的&表示承接上文的意思,这里也就等同于.b-menu:after
    content ' '
    position absolute // 使用绝对定位到目标位置
    background-color #fff
    display block
    width 100%
    height 3px
    left 0
    top 11px
    border-radius 3px
    transition all .5s
    transform-origin 50% 50% // 设置变换中心点，这个很重要，直接影响到后面的效果
  &:before
    transform translateY(-6px) // 第一个横杆向上偏移，这里使用transform而不使用top属性是为了方便后面的使用
  &:after
    box-shadow 0 6px 0 0 #fff
  &:focus:before // 通过focus获取焦点，来触发起伪元素的变化
    transform rotateZ(45deg) translateY(0)
  &:focus:after
    box-shadow 0 0 0 0 #fff
    transform rotateZ(135deg) translateY(0)
```

### 这个是开关的效果
效果是这样的（duang!duang!daung!）
![switch button](http://upload-images.jianshu.io/upload_images/2005796-094b4f13a9f7237d.gif?imageMogr2/auto-orient/strip)

<iframe height='265' scrolling='no' title='switch button' src='//codepen.io/leenty/embed/jVMmjz/?height=265&theme-id=0&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='http://codepen.io/leenty/pen/jVMmjz/'>switch button</a> by leenty (<a href='http://codepen.io/leenty'>@leenty</a>) on <a href='http://codepen.io'>CodePen</a>.
</iframe>

[这里是switch button演示地址](http://codepen.io/leenty/pen/jVMmjz/)

开关效果又比之前那个复杂，switch的原理其实就是checkbox，
因为input是单标签，所以无法使用伪元素，这里就用到了label

核心使用
* 属性：`transform`, `background-size`, `border-radius`, `border-width`, `transition`, `cubic-bezier`
* 标签：`label`
* 伪元素：`:before`, `:after`

代码如下：
html
```js
input(id="switch",type="checkbox").b-switchBtn
label(for="switch").b-switchLabel
// label标签利用for属性与相应id的input标签绑定，从而达到点击label就是点击input的效果
```
css
```css
button,
input
  border none
  outline none
  box-shadow none
  background none
  color currentColor
  padding 0
  cursor pointer
  
.b-switchLabel
  position relative
  display inline-block
  width 60px
  height 25px
  input
    display none
  &:before, // before 作为白条
  &:after // after 作为水滴状开关
    content ' '
    display block
    position absolute
  &:before
    width 100%
    height 4px
    background-color #fff
    left 0
    top 50%
    border-radius 5px
    transform translateY(-50%)
  &:after
    background-image url('http://upload-images.jianshu.io/upload_images/2005796-fcc62a13bd69f679.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240')
    // 因为css不好写出漂亮的水滴效果，所以这里取巧用了图片
    background-size cover // 利用这个属性缩放原来太大的图片
    height 25px
    width 25px
    left 23%
    top 51%
    border-radius 25px
    transform-origin center center // 老套路，定下变换中心点
    transform translate(-50%, -50%) // 矫正left和top的偏移
    background-clip border-box // 利用border-box属性值来使背景图片在border上也能显示
    background-position 50% 50%
    border-style solid
    border-color transparent // 设置透明border有助于背景的显示
    border-width 0 3px 0 0
    transition all .5s cubic-bezier(0.4, -0.95, 0.4, 1.8) // 设置贝塞尔曲线以达到Duang的效果
.b-switchBtn
  display none
  &:checked~.b-switchLabel // 设置开关在被选中时改变状态，配合transition就动了起来
    &:after
      left 78%
      border-width 0 0 0 3px
```

有疑问的或者有建议的可以在下方留言


