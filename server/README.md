# 移动书城api

> 说明：本项目为[移动书城](https://github.com/tgxhx/vue-reader)的api，数据为nodejs爬虫爬取，爬虫地址[在此](https://github.com/tgxhx/node-crawler)

> 使用了express构建，需配合爬虫爬取数据

> 在线api暂时关闭，提供sql文件下载，包含了api所需的数据，可直接导入mysql中，[下载地址](https://pan.baidu.com/s/1b08B3S) 

## 接口说明

``` bash
安装
git clone git@github.com:tgxhx/node-book-api.git
npm install

运行
node app.js

默认端口为3333,若不想使用3333端口,可使用以下命令:

Mac/Linux
PORT=4000 node app.js

windows 下使用 git-bash 或者 cmder 等终端执行以下命令:
set PORT=4000 && node app.js
```

#### 书籍详情
说明：调用此接口获取书籍详情

无参数时，获取所有书籍详情

可选参数：

id：指定书籍详情

接口地址：/booklist

调用例子：/booklist?id=1

#### 书籍分类
说明：调用此接口获取书籍分类

必选参数：

type：指定书籍类型

type参数说明：玄幻1 修真2 都市3 历史4 网游5

接口地址：/type

调用例子：/type?type=1

#### 章节内容
说明：调用此接口获取指定书籍和指定章节

必选参数：

book：指定书籍

id：指定章节

接口地址：/book

调用例子：/book?book=10&id=1

#### 章节标题列表
说明：调用此接口获取指定书籍章节标题列表

必选参数：

id：指定书籍

接口地址：/titles

调用例子：/titles?id=1
