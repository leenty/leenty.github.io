---
title: vue2.0一起在懵逼的海洋里越陷越深（四）
date: 2016-12-04 20:35:32
tags: [vueJs, vuex]
---
### 前言
承接上文[vue2.0一起在懵逼的海洋里越陷越深（三）](/2016/11/27/vue2-3/)
前面一篇讲了vue-router的`router-link`,
有读者说希望能先看到vuex的文章
其实vuex在我的vue2.0的demo里已经在使用了
想想确实应该先来点vuex的了，因为有些有关的状态管理急需vuex的加入
好，那么这次就先上vuex吧！

### 正文
OK！先介绍下vuex
vuex是vuejs的状态管理方案
因为vuex有些复杂，一般应用在较复杂的状态环境下，如果是比较简单的应用就不需要安装vuex了
#### vuex单向数据流
![vuex单向数据流](/img/vue/flow.png)
如上图所示是vuex单向数据流的流程

** 我知道，如果是第一次接触这玩意，到这就懵逼了，就像我第一次看文档一样 **
![vuex单向数据流](/img/face/mengbi3.jpg)

** 下面解释下`State` **
前面说了vuex是vuejs的状态管理方案，这里的状态就是图中的`state`
在平时写写前端的过程中，都会涉及到状态的问题，
比如你看到了一篇文章写的不错，就想要收藏，
然后又对作者有些兴趣，于是又加了关注，当然这些最后都是需要前端来表达出来
这里面就涉及了两个状态就是收藏与关注
这里的收藏与关注我们可以将其用一个变量来表示，当然如这两种只存在两个相对状态的用布尔值(`bool`)来表示就可以了

** 然后是`view` **
`view`就是视图,也就是前端所写的页面，前面的`state`就可以在`view`里面得到体现，即是你看到的是否关注了作者

** 而后是`Actions` **
`Actions`是`View`用来改变`State`的方法，通过改变`State`从而改变`View`的显示

这么说有些抽象，打个比方
假设学生小明生病了
小明要向班主任请假(小明就是`View`，小明想改变自己的显示状态，从上学状态变成请假状态)
于是小明口头向班主任请假(请假就是`Actions`，小明通过请假这一个方法达到请假的目的)
班主任批准，小明请假成功(班主任就是`State`的提供者，小明通过请假方法使班主任改变小明的`State`状态)
着也就解释了为什么要有这个流程，有了这个流程就可以统一管理各个`view`的各个状态

#### vuex多个组件共享状态
先贴个流程图，懵逼是没啥关系的
![vuex多个组件共享状态](/img/vue/vuex.png)
可以看到这一张图比前面一张复杂了许多，其实里面的实线框就是上图的升级版

情况是这样，原来小明学校里这段时间许多同学得了流感，于是同学们一窝蜂的要求请假，
学校里因为人太多，又没有一个记录，人数清点不过来了，于是班主任要求请假必须提交请假条

好的，来解释下上图内的实线部分，之前的`View`在这里改名成了`Vue Components`,代表了多个组件(这里即是指多个同学)
包括小明在内的多个同学`Vue Components`都得了流感，一起想要请假`Actions`(他们即将共享一个请假状态)，小明代表多个同学写了一张请假条交给班主任(`State`提供者)签字同意(签字同意这个动作就是`Mutations`，触发了`State`的改变),班主任同意后统一给他们改变了`State`（请假成功）

这里的多了一个同步与异步的区别，其中`Mutations`只受理同步处理，而`Actions`就是执行异步操作的函数，作为代价，`Actions`不再能直接触发改变`State`状态，而是需通过`Mutations`来触发`State`的改变

情况是这样，因为不只是一个班的学生得了流感，请假的人比较多，学校`Backend API`需要做一个统计，于是请假需要得到学校专门的请假条的并通过学校签字才能生效，这里就有了虚线部分。
请假`Actions`改变`State`的方法不再是仅仅班主任签字就可以了，而是需要通过学校这个前提，于是`Actions`就变成了一个异步请求，需要得到学校`Backend API`的专门的请假条和签字同意后，才能向班主任提交改变`State`的申请

这里想要表达的意思就是，`Vue Components`改变自身状态需要通过`Actions`（有需要的话要向后端接口`Backend API`发送请求）来操作`Mutations`改变`State`从而改变自身状态。
至于图中没有说到的`Devtools`是一个开发者工具，是一个便于查看和管理vue应用以及vuex状态的浏览器插件。
你可以在里面看到你vue对象和vuex每一次的commit，commit后面会说到。还有你当前的应用状态
![devtools](/img/vue/devtools.png)
附上一个[devtools库地址](https://github.com/vuejs/vue-devtools)

#### 架构vuex
项目结构：
```
├── main.js
├── App.vue
├── components
│   ├── Home.vue
│   └── ...
└── store
    ├── index.js          # 组装模块并导出 store 的地方
    ├── actions.js        # 根级别的 action
    ├── mutations.js      # 根级别的 mutation
    ├── types.js          # mutation命名空间
    └── modules
        ├── demo.js       # demo模块
        └── status.js     # 全局应用状态模块
```
结构可以根据个人需要进行调整

** 下面开始构建`store/index.js` **
当然在这之前，如果没有安装vuex的需要先安装
```shell
npm i vuex -S
```
由于vuex的内容太多，这里先说基础用法
首先为`store/index.js`编写内容
```js
import Vue from 'vue'
// 导入vue
import Vuex from 'vuex'
// 导入vuex

import status from './modules/status'
// 导入status模块（这是我管理全局应用状态的模块）
import demo from './modules/demo'
// 导入demo模块（这个的部分演示可以在http://vue2.leenty.com/demo/vuex_state/里看到）

Vue.use(Vuex)
// 告诉vue将要使用vuex

const debug = process.env.NODE_ENV !== 'production'
// env里去获取当前的环境是否需要开启严格模式
// 在发布环境开启严格模式会造成性能上不必要的损失

export default new Vuex.Store({
// 默认导出vuex模块
  modules: {
  // 导入模块
    status,
    demo
  },
  strict: debug
  // 是否开启严格模式
})
```

** 构建state模块 **
这里以`demo.js`为例

```js
import * as types from '../types'
// 导入mutations的命名空间

const state = {
// 定义state
  demoFollow: false,
  // 这里模拟的是关注的状态，布尔值表示是否关注
  demoFollowPending: false
  // 是否在请求中(actions是否在执行异步操作)
}

const getters = {
// 定义getters, getters是对state的扩展，可以以state衍生出其他状态
  demoFollowStatus: state => state.demoFollow ? '已关注' : '未关注'
  // demoFollowStatus是demoFollow的衍生量，将原来的布尔值映射为'已关注' : '未关注'
}

const mutations = {
// 只有mutations才能操作改变state，mutations是同步执行的
// 所以有关异步的操作请放在actions里执行
  [types.DEMO__VUEX_FOLLOW] (state, status = NaN) {
  // 使用预定义好的名字来写mutations方法
    state.demoFollow = isNaN(status) ? !state.demoFollow : status
  },
  [types.DEMO__VUEX_FOLLOW_PENDING] (state, status = NaN) {
  // 这里对status传值做了审查，如没有传，则对要改变的布尔值进行取反操作
    state.demoFollowPending = isNaN(status) ? !state.demoFollowPending : status
  }
}

const actions = {
// actions是可以执行异步操作的，操作完毕后触发mutations里的方法去改变state的状态
  demoFollowAjax ({commit}, status) {
    commit(types.DEMO__VUEX_FOLLOW_PENDING)
    // 在异步操作前通过mutations告诉应用，现在正在进行异步操作
    setTimeout(() => {
      // 利用延时函数模拟异步的ajax操作
      commit(types.DEMO__VUEX_FOLLOW_PENDING)
      // commit 是在actions里用来触发mutations的方法
      // 告诉应用，异步操作结束
      commit(types.DEMO__VUEX_FOLLOW, status)
      // 为关注按钮赋予新的状态
    }, 2000)
  }
}

export default {
// 导出整个demo模块
  state,
  getters,
  actions,
  mutations
}
```
** 这里解释下mutations里的方法的奇怪写法，我知道如果对es6于法了解不多这里是会懵逼的 **
```js
const mutations = {
  [types.DEMO__VUEX_FOLLOW] (state, status = NaN) {
    state.demoFollow = isNaN(status) ? !state.demoFollow : status
  }
}
```
这是对象内方法的简化写法，其中`types.DEMO__VUEX_FOLLOW`是在`types.js`里预定义的，内容如下
```js
export const DEMO__VUEX_FOLLOW = 'DEMO__VUEX_FOLLOW'
export const DEMO__VUEX_FOLLOW_PENDING = 'DEMO__VUEX_FOLLOW_PENDING'
// 其实就是字符串集合，最后用 import * as types from '../types' 方法导入vuex模块里
// 就变成了一个types对象
```
上例中全部展开是这样的
```js
const mutations = {
  [types.DEMO__VUEX_FOLLOW]: (state, status = NaN) => {
  // [types.DEMO__VUEX_FOLLOW]是提取types.DEMO__VUEX_FOLLOW的值的一种方式
  // 在这里[types.DEMO__VUEX_FOLLOW]提取出来就是types.js里预定义的'DEMO__VUEX_FOLLOW'
    if (isNaN(status){
      state.demoFollow = !state.demoFollow
    } else {
      state.demoFollow = status
    }
  }
}
```
好，到此为止，vuex就已经建立好了，下面就说如何使用了

#### 应用状态的使用与改变
vuex提供了4个辅助函数
```js
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
```
是分别用来获取`State, Getters, Actions, Mutations`的map方法
在vue Components里面你可以以这样的方式来导入需要使用的方法

这4个方法拥有统一的参数格式以及一个统一的返回格式
可以传入一个数组
```js
mapGetters(['demoFollowStatus'])
// 此方法导出的是一个Getters对象
mapGetters({
  demoFollow: 'demoFollowStatus'
})
// 可以通过传入对象的形式来改变得到的getters方法名
```
同理，不同的map方法会导出各自的方法
其中`mapState, mapGetters`将会导出适用于`computed`的方法
而`mapMutations, mapActions`将会导出适用于`methods`的方法

这里以一个demo组件为例[DemoVuexState.vue](https://github.com/leenty/vue2/blob/master/src/components/DemoVuexState.vue)
```js
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
  // vue的计算属性，计算属性内方法的私有变量变动会触发这个属性的重新计算
    ...mapState({
      mapStateFollow: ({demo}) => demo.demoFollow,
      mapStateFollowPending: ({demo}) => demo.demoFollowPending
    }),
    // mapState()直接读取State里的状态内容
    ...mapGetters(['demoFollowStatus'])
    // mapGetters()通过getters转化state从而得到你想要的内容
  },
  methods: {
  // vue的方法，可以是一个事件的方法，也可以是一个vuex的方法，也可以是一个普通函数
    ...mapMutations(['DEMO__VUEX_FOLLOW']),
    // 同步的改变状态
    ...mapActions(['demoFollowAjax'])
    // 异步的改变状态
  }
}
```
这段代码是一个demo里的片段，效果大家可以看[这个呆萌](http://vue2.leenty.com/demo/vuex_state)，如果开心了可以在[github库里加个星](https://github.com/leenty/vue2)，如果有问题可以评论😀











