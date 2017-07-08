# vue+nodejs+mysql的移动书城

> 技术栈：vue + vue-router + vuex + webpack + axios + less + flex + express + nodejs + mysql + localStorage

> [预览地址](http://39.108.14.248/reader)
## 使用说明

``` bash
#克隆项目
git clone git@github.com:tgxhx/vue-reader.git

# 安装依赖
npm install

# 本地开发环境 访问http://localhost:8080
npm run dev

# 构建生产
npm run build

```

## 项目说明
该项目很早以前就开始写了，算是用vue写的第一个项目，所以代码还是有不少问题，但是应该很符合vue入门使用者的写法，比如直接修改state：this.$store.state.xx = xx。

最开始是用jQuery写了阅读器部分，后来为了学习，就尝试用vue重构，学习了整个vue技术栈。

后来想想阅读器写好了，没有书可不行，想想应该用爬虫爬点数据，于是各种查找node爬虫的资料，写了不少爬虫，本项目使用的爬虫地址在这：[地址](https://github.com/tgxhx/node-crawler)。

数据有了，接下来该构建api了，谷歌了一下发现用express好像不错，于是又学习了express部分，构建了所需的api。

再接着就上vue全家桶开始写了。

## 功能
- [x] 首页推荐
- [x] 书籍详情
- [x] 相似推荐
- [x] 分类查看 
- [x] 阅读器 
- [x] 章节跳转
- [x] 更改字体
- [x] 更换主题
- [x] 夜间模式
- [x] 翻页浏览
- [x] 本地存储（存储每本书的阅读进度）
- [ ] 书架（待考虑）


## 项目截图
![](screen/1.png)![](screen/2.png)
![](screen/3.png)![](screen/4.png)
![](screen/5.png)
