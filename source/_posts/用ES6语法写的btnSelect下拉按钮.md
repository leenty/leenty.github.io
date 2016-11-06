---
title: 用ES6语法写的btnSelect下拉按钮
date: 2016-10-13 00:43:04
tags: [ES6,js]
---
### btnSelect下拉按钮
按钮支持多个按钮关联，带联想功能
```javascript
// 下拉选择按钮 btnSelect
/* 暴露btnSelect类，假定全局存在jQuery */
export default class btnSelect {
  constructor () {
    this.btnSelectClass = ".btn__select"
  }
  init () {
    var btnSelectList = {}
    $(this.btnSelectClass).each(function(){
      var name = $(this).children('input[type="hidden"]').attr("name");
      var btnSelect = new btnSelectClass($(this))
      btnSelectList[name] = btnSelect
      btnSelect.init()
    })
    window.btnSelectList = btnSelectList
    var btnSelectRelations = new btnSelectRelation(["province","city"])
    btnSelectRelations.init()
  }
}

/**
 * 注册的组件放在window.btnSelectList下 取input[type='hidden']的name值为键名
    <span class="btn__select">
      <input type="text" placeholder="专业">
      <input type="hidden" name="qwe">
      <button type="button"></button>
      <ul>
        <li name="caa">123</li>
        <li name="tafa">456</li>
        <li name="xafa">789</li>
      </ul>
    </span>
 *
 * 简写 在实例化的时候会补全，不过这样是没有初始数据的
    <span class="btn__select">
      <input type="text" placeholder="专业">
      <input type="hidden" name="qwe">
    </span>
 * 
 * 导入数据
    window.btnSelectList.qwe.set({
      caa: "中国美术学院",
      tafa: "天津美术学院",
      xafa: "西安美术学院"
    })
 *
 * 获取
    window.btnSelectList.qwe.get()
 *   
 */
class btnSelectClass {
  constructor (element, data = null){
    this.btn__select = element
    this.data = data
    this.preText = ""
    this.name = undefined
    this.btnSelectRelation = null
    this.set = data => {
      this.data = data
      this.reBuildDom(data)
    }
    this.get = () => this.btn__select.children("input[type='hidden']").val()
  }

  init () {
    var _this = this
    this.data == null && this.buildBtnSelect()
    // 选择 取值
    this.btn__select.on("click","li",function(){
      _this.setValue($(this).attr("name"), $(this).text())
      typeof _this.btnSelectRelation === "function" && _this.btnSelectRelation(_this.name,$(this).attr("name"))
    })
    // 监听输入动作，触发搜索功能
    this.btn__select.children("input[type='text']").keyup(e => {
      var val = $(e.target).val()
      val !== this.preText && this.search(val)
    })
    this.setName()
  }

  setValue (name, value) {
    this.btn__select.children("input[type='text']").val(value)
    this.btn__select.children("input[type='hidden']").val(name)
  }

  setName () {
    this.name = this.btn__select.children('input[type="hidden"]').attr("name")
  }

  buildBtnSelect () {
    var ul = this.btn__select.children("ul")
    var button = this.btn__select.children("button")
    button.length == 0 && this.btn__select.children("input[type='hidden']").after('<button type="button"></button>')
    if(ul.length == 0){
      this.btn__select.append("<ul></ul>")
      this.data = {}
    }else{
      var data = {}
      var items = this.btn__select.find("li")
      items.each(function(){
        data[$(this).attr("name")] = $(this).text()
      })
      this.data = data
    }
  }

  reBuildDom (data) {
    var ul = this.btn__select.children("ul")
    ul.empty()
    var items = ""
    $.each(data, function (k,v) {
      items += `<li name="${k}">${v}</li>`
    })
    ul.append(items)
  }

  search (val) {
    this.preText = val
    var data = {}
    if(val != ""){
      $.each(this.data,(k, v) => {
        (v.indexOf(val) > -1) && (data[k] = v)
      })
      this.reBuildDom(data)
    }else{
      this.reBuildDom(this.data)
    }
  }
}

/*["province","city"]*/
/**
 * btnSelect关联器
 * 在btnSelect初始化之后 才能 将关联器调用初始化
 *
 * 在实例化关联器是传入与关联按钮的name数组，按关联顺序排序
 * 如下：province的下一级是city
 * 
 * 关于初始化的板栗：
    var btnSelectRelations = new btnSelectRelation(["province","city"])
    btnSelectRelations.init()
 *
 * 设置数据:
    window.btnSelectList.province.setSource({
      zj: "浙江省",
      hn: "湖南省",
      sc: "四川省"
    })

    window.btnSelectList.city.setSource({
      zj: {
        hz:"杭州市",
        sx:"绍兴市",
        jh:"金华市"
      },
      hn: {
        cs:"长沙市",
        yy:"岳阳市",
        cd:"常德市"
      },
      sc: {
        cd:"成都市",
        my:"绵阳市",
        dy:"德阳市"
      }
    })
 * 
 */
class btnSelectRelation {
  constructor (relationType) {
    this.relationType = relationType
    this.relationData = []
    this.set = (childName, data) => {
      var index = this.getChildIndex(childName)
      this.relationData[index] = data
      index == 0 && this.setChildData(index, data)
    }
  }
  init () {
    $.each(this.relationType,(k, v) => {
      window.btnSelectList[v].setSource = data => {
        var name = v
        this.set(name,data)
      }
      window.btnSelectList[v].btnSelectRelation = (btnName,key) => {
        var index = this.getChildIndex(btnName) + 1
        index > 0 && index < this.relationData.length && this.filter(index, key)
      }
    })
  }

  getChildIndex (childName) {
    return this.relationType.indexOf(childName)
  }

  filter (index, key) {
    this.setChildData(index, this.relationData[index][key])
  }

  setChildData (index, data) {
    window.btnSelectList[this.relationType[index]].set(data)
  }
}
```
### 补上css,这里是用stylus语法
```stylus
/* 清除按钮样式 */
btn-clean()
  border none
  outline none
  box-shadow none
  background none

/* 下拉按钮样式 */
dropDown()
  padding 0
  border-left 6px solid transparent
  border-right 6px solid transparent
  border-top 10px solid mt-orange

.btn__select
  btn-clean()
  border 1px solid #ccc
  border-radius 2px
  font-size 14px
  color gray-a7
  padding 0.5em 0.7em
  position relative
  input,
  button
    btn-clean()
    &:focus~ul
      display block
  button
    dropDown()
  ul
    position absolute
    top 100%
    left 0
    width 100%
    border-radius 0 0 2px 2px
    box-shadow 0 2px 2px rgba(0,0,0,.3)
    display none
    &:hover
      display block
  li
    padding 0.5em 0.3em
    border 1px solid #ccc
    &:not(:last-child)
      border-bottom none
    &:last-child
      border-radius 0 0 2px 2px

```

