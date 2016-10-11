---
title: 使用原生js以base64读取本地图片文件
date: 2016-10-11 01:01:23
tags:
---
## 起因
在做项目的时候遇到了一个问题，需要用户上传一张图片在画布里操作，一般的逻辑是先传图片到服务器，然后从服务器读取这张图片，这过程中可能读取的时间会过长，而且服务器也没必要存操作前的图片，于是就需要本地读取图片（这里用base64的格式）。
这里为了备忘，记录下。
## 代码
```javascript
File.prototype.convertToBase64 = function(callback){
    var FR= new FileReader();
    FR.onload = function(e) {
         callback(e.target.result)
    };       
    FR.readAsDataURL(this);
  }
```
## 使用方法
```javascript
document.querySelector('[type="file"]').files[0].convertToBase64(function(base64){
    console.log(base64);
});
```

