##题库一级目录类型

### 添加一级目录
+ method: post,
+ url: http://localhost:3000/subjectType/create
+ data {
  typename: "时间"
}
1. 成功: 
```json
{
  "code": 200,
  "data": {
    "__v": 0,
    "typename": "一级目录",
    "_id": "586d06121da9a230f87cc3d1",
    "updated": "2017-01-04T14:26:26.068Z",
    "created": "2017-01-04T14:26:26.058Z"
  }
}
```
2. 失败
```json
{
  code: 400,
  msg: "数据有误"

}
```

### 修改  subjectType
+ method:  post
+ url: http://localhost:3000/subjectType/update
+ data: {
    "_id":  "5865d7f624657a5348fdfbe9"
    "subjectType": "时间"
}
+ result:　
1. 有修改内容

```json

'{'
    "code": 200,
    "msg": "更新成功"
'}'

```

2. 无修改
```json
'{'
    "code": 302,
    "msg": "数据未修改"
'}'
```
3. 其它
```json
'{'
    "code": 500,
    "msg": "服务器发生错误"
'}'
```

### 一级目录 , 获取所有 subjectType
+ method: get
+ url: http://localhost:3000/subjectType/list
+ result:
1. 成功

```json
'{'
  "code": 200,
  "data": [
    {
      "_id": "5865d7f624657a5348fdfbe9",
      "typename": "时间段"
    },
    {
      "_id": "5865d85f6e9c5652d809280b",
      "typename": "课内"
    },
    {
      "_id": "5865d86eb29c764f105878d9",
      "typename": "职业方向"
    }
  ]
'}'
```
2. 失败
```json
'{'
    "code": 500,
    "msg": "服务器错误"
'}'

```

## 题库二级目录 subjectItem

### 添加二级目录
+ method: post,
+ url: http://localhost:3000/subjectItemType/create
+ data {
  subjectName: "大英",
  parentType: "课内"  //需要获取一级目录数据来填充
}
1. 成功: 
```json
{
    "code": 200,
    "msg": "创建成功",
    "item": {
    "subjectName": "大英",
    "parentType": "课内",
    "parentId": "5865d85f6e9c5652d809280b"
    }
}
```
2. 已经存在
```json
{
  code: 400,
  msg: "已经存在该课程"

}
```
3. 失败
```json
{
  code: 500,
  msg: "数据有误"

}



###　获取二级目录数据
+ method: get
+ url: http://localhost:3000/subjectItemType/list
+ result:

1. 成功:

```json
'{'
 "code": 200,
 "data": {
           "_id": "5866272769e4d846ec8bb2a9",
           "subjectName": "前端开发指南",
           "parentType": "职业方向",
           "parentId": "5865d86eb29c764f105878d9",
           "__v": 0,
           "updated": "2016-12-30T09:21:43.960Z",
           "created": "2016-12-30T09:21:43.951Z"
       },
       {
           "_id": "58662b4639ae315b98eee90f",
           "subjectName": "计算机基础指南",
           "parentType": "课内",
           "parentId": "5865d85f6e9c5652d809280b",
           "__v": 0,
           "updated": "2016-12-30T09:39:18.167Z",
           "created": "2016-12-30T09:39:18.163Z"
       },
       {
       {
           "_id": "58662b6539ae315b98eee910",
           "subjectName": "计算机基础",
           "parentType": "课内",
           "parentId": "5865d85f6e9c5652d809280b",
           "__v": 0,
           "updated": "2016-12-30T09:39:49.308Z",
           "created": "2016-12-30T09:39:49.307Z"
       }
'}'
```

2. 失败

```json
'{'
    "code": 500,
    "msg": "服务器错误"
'}'
```
### 新建数据
+ method: post
+ url: http://localhost:3000/subjectItemType/create
+ 参数: {
    subjectName,
    parentType //这个需要先通过题库一级目录的接口提前获取， 以select option展示
}
+ result:

1. 成功
```json
'{'
    "code": 200,
    "msg": "创建成功",
    "item": ｛
        "_id": "58662b6539ae315b98eee910",
        "subjectName": "计算机基础",
        "parentType": "课内",
        "parentId": "5865d85f6e9c5652d809280b",
        "__v": 0,
        "updated": "2016-12-30T09:39:49.308Z",
        "created": "2016-12-30T09:39:49.307Z"
      ｝
'}'
```
2. 已经存在课程
```json
'{'
    "code": 400,
    "msg": "已存在该课程"
'}'
```
3. 其他
```json
'{'

    "code": 500,
    "msg": "数据有误"
'}'
```

### 获取导航目录所有数据

+ method: get
+ url: http://localhost:3000/subjectAll
+ result:

1. 成功:　

```json
"{"
  "code": 200,
  "data": [
    {
      "_id": "5865d7f624657a5348fdfbe9",
      "typename": "时间",
      "__v": 0,
      "updated": "2016-12-30T03:43:50.331Z",
      "created": "2016-12-30T03:43:50.323Z",
      "subjects": [
        {
          "_id": "58691994b42b81386861675e",
          "subjectName": "2016",
          "parentType": "时间",
          "parentId": "5865d7f624657a5348fdfbe9",
          "__v": 0,
          "updated": "2017-01-01T15:00:36.600Z",
          "created": "2017-01-01T15:00:36.599Z"
        },
        {
          "_id": "58691999b42b81386861675f",
          "subjectName": "2017",
          "parentType": "时间",
          "parentId": "5865d7f624657a5348fdfbe9",
          "__v": 0,
          "updated": "2017-01-01T15:00:41.897Z",
          "created": "2017-01-01T15:00:41.896Z"
        }
      ]
    },
    {
      "_id": "5865d85f6e9c5652d809280b",
      "typename": "课内",
      "__v": 0,
      "updated": "2016-12-30T03:45:35.375Z",
      "created": "2016-12-30T03:45:35.364Z",
      "subjects": [
        {
          "_id": "586918f3b42b813868616759",
          "subjectName": "计算机网络",
          "parentType": "课内",
          "parentId": "5865d85f6e9c5652d809280b",
          "__v": 0,
          "updated": "2017-01-01T14:57:55.919Z",
          "created": "2017-01-01T14:57:55.914Z"
        },
        {
          "_id": "586918feb42b81386861675a",
          "subjectName": "操作系统",
          "parentType": "课内",
          "parentId": "5865d85f6e9c5652d809280b",
          "__v": 0,
          "updated": "2017-01-01T14:58:06.530Z",
          "created": "2017-01-01T14:58:06.529Z"
        },
        {
          "_id": "5869190cb42b81386861675b",
          "subjectName": "数据库分析与设计",
          "parentType": "课内",
          "parentId": "5865d85f6e9c5652d809280b",
          "__v": 0,
          "updated": "2017-01-01T14:58:20.792Z",
          "created": "2017-01-01T14:58:20.792Z"
        }
      ]
    },
    {
      "_id": "5865d86eb29c764f105878d9",
      "typename": "职业方向",
      "__v": 0,
      "updated": "2016-12-30T03:45:50.443Z",
      "created": "2016-12-30T03:45:50.431Z",
      "subjects": [
        {
          "_id": "58691924b42b81386861675c",
          "subjectName": "前端开发指南",
          "parentType": "职业方向",
          "parentId": "5865d86eb29c764f105878d9",
          "__v": 0,
          "updated": "2017-01-01T14:58:44.100Z",
          "created": "2017-01-01T14:58:44.099Z"
        },
        {
          "_id": "58691947b42b81386861675d",
          "subjectName": "服务端实例",
          "parentType": "职业方向",
          "parentId": "5865d86eb29c764f105878d9",
          "__v": 0,
          "updated": "2017-01-01T14:59:19.019Z",
          "created": "2017-01-01T14:59:19.019Z"
        }
      ]
    }
  ]
"}"
```

2. 失败
```json
"{"
    code: 500,
    msg: "服务器错误"
"}"
```

## 题目设计

### 添加题目
+ method: post
+ url: http://localhost:3000/subject/create
+ 参数: {
  title: 'ACM真题',                              
  question: '1+1+3+1+1=?',                        
  choice: [ '7', '44', '5', '6' ],                
  select: 'A',                                    
  detail: '答案就是就是这么简单的',                          
  score: '2' }                                    
}

1. 成功 
```json
{
  "code": 200,
  "data": {
    "__v": 0,
    "title": "ACM真题",
    "titleId": "586e30cd4958ed24e4baabeb",
    "question": "1+1+3+1+1=?",
    "choice": {
      "D": "6",
      "C": "5",
      "B": "44",
      "A": "7"
    },
    "answer": {
      "detail": "答案就是就是这么简单的",
      "select": "A"
    },
    "score": 2,
    "_id": "586e4c427ca0463fe441d6e2",
    "updated": "2017-01-05T13:38:10.729Z",
    "created": "2017-01-05T13:38:10.717Z"
  }
}
```
2. 失败
```json
{
  code: 500,
  msg: "服务器错误"
}
```

3. 参数错误(id不存在或者不是24位的Id)
```json
{
  code: 400,
  msg: '参数有误'
  
}
```

### 获取 某一课程 的题库列表
+ method: get
+ url: http://localhost:3000/subjectListByItemId/:titleId
+ 参数(在url直接添加): {            
  itemId: '586e30cd4958ed24e4baabeb', // 通过 习题名 subjectTitle的 api获取                             
}
如: http://localhost:3000/subjectListByItemId/586e30cd4958ed24e4baabeb
+ result 
```json
{
  "code": 200,
  "data": [
    {
      "_id": "586e34444685cd3f707e7497",
      "subjectItem": "数学",
      "subjectItemId": "586e30cd4958ed24e4baabeb",
      "question": "3+3=?",
      "choice": {
        "A": "424",
        "B": "44",
        "C": "5",
        "D": "6"
      },
      "answer": {
        "select": "D",
        "detail": "答案就是就是这么简单的"
      },
      "score": 2,
      "__v": 0,
      "updated": "2017-01-05T11:55:48.062Z",
      "created": "2017-01-05T11:55:48.061Z"
    },
    {
      "_id": "586e4520e06b9839442db06a",
      "subjectItem": "数学",
      "subjectItemId": "586e30cd4958ed24e4baabeb",
      "question": "1+1+3+1+4=?",
      "choice": {
        "A": "10",
        "B": "44",
        "C": "5",
        "D": "6"
      },
      "answer": {
        "select": "A",
        "detail": "答案就是就是这么简单的"
      },
      "score": 2,
      "__v": 0,
      "updated": "2017-01-05T13:07:44.104Z",
      "created": "2017-01-05T13:07:44.096Z"
    }
  ]
}
```
2. 失败 
```json
{
 "code": 500,
 "msg": "服务器错误"
}
```

3.参数有误
```json
{
  "code": 400,
  "msg": "输入数据有误"
}

```
### 获取 某一题 的信息
+ method: get
+ url: http://localhost:3000/subjectListBySbId/:subjectId
+ 参数(在url直接添加): {            
  subjectId: '586e34444685cd3f707e7497'                        
}
如: http://localhost:3000/subjectListBySbId/586e34444685cd3f707e7497
+ result 
```json
{
  "code": 200,
  "data": {
    "_id": "586e34444685cd3f707e7497",
    "subjectItem": "数学",
    "subjectItemId": "586e30cd4958ed24e4baabeb",
    "question": "3+3=?",
    "choice": {
      "A": "424",
      "B": "44",
      "C": "5",
      "D": "6"
    },
    "answer": {
      "select": "D",
      "detail": "答案就是就是这么简单的"
    },
    "score": 2,
    "__v": 0,
    "updated": "2017-01-05T11:55:48.062Z",
    "created": "2017-01-05T11:55:48.061Z"
  }
}
```
2. 失败 
```json
{
 "code": 500,
 "msg": "服务器错误"
}
```

3.参数有误
```json
{
  "code": 400,
  "msg": "输入数据有误"
}
```
### 获取所有试题名 
+ method: get
+ url: http://localhost:3000/subjectTitle/list




### 获取试题名 (时间)
+ method: get
+ url: http://localhost:3000/subjectTitleByTime/:time
+ 参数(在url直接添加): {            
  time: 2016                    
}
+ result 
```json
{
  "code": 200,
  "data": [
    {
      "_id": "586e70f15e5f2336d8aa7ef5",
      "title": "ACM练习"
    }
  ]
}
```
2. 失败 
```json
{
 "code": 500,
 "msg": "服务器错误"
}
```

3.参数有误
```json
{
  "code": 400,
  "msg": "输入数据有误"
}
```

### 获取试题名 (二级目录Id)
+ method: get
+ url: http://localhost:3000/subjectTitleBySbId/:subjectItemId
+ 参数(在url直接添加): {            
  subjectItemId: "586e6fb25e5f2336d8aa7ef1"                    
}
+ result 
```json
{
  "code": 200,
  "data": [
    {
      "_id": "586e70f15e5f2336d8aa7ef5",
      "title": "ACM练习"
    }
  ]
}
```
2. 失败 
```json
{
 "code": 500,
 "msg": "服务器错误"
}
```

3.参数有误
```json
{
  "code": 400,
  "msg": "输入数据有误"
}
```

## 后台添加数据


### 添加一级目录 localhost:3000/createSubjectType

### 添加二级目录 localhost:3000/createSubjectItem

### 添加试题名 localhost:3000/addSbTitle

### 添加题目 localhost:3000/createSubject

### 修改二级目录 (post) localhost:3000/subjectItemType/update
```js
data = {
  _id : 二级目录的id, (localhost:3000/subjectItemType/list 获取二级目录列表里面的_id)
  parentId: 一级目录id
  subjectName: 要修改的二级目录名

}
```



### 修改试题名 (post) localhost:3000/subjectTitle/update

```js
data = {
  preTitleid：被修改的试题Id，
  subjectItemId: 试题二级目录的Id[String],
  title: 试题名[String],
  subjectTime: 试题时间[String],
  examTime: 考试时间[String]
}
```





### 试题状态 已做 (post) http://localhost:3000/subjects/doFinished 
/**
 * method: post
 * data: {
 *  titleId: 试题名id[string]
 *  title: 试题名[string]
 *  history: 答题记录[试题序列对应的用户答案的键值对 Object]
    score: 分数[string]
 * }
 */



### 试题状态 打开过 (post) http://localhost:3000/subjects/doRead 
/**
 * method: post
 * data: {
 *  titleId: 试题名id
 *  title: 试题名
 *  
 * }
 */

### 获取试题状态 已做的试题 (post) http://localhost:3000/subjects/listFinished

### 获取试题状态 打开过的试题 (post) http://localhost:3000/subjects/listRead


### 推荐 试题接口: (post) http://localhost:3000/subjectTitle/updateWeight 
参数: 
data = {
  titleId: 试题名id
}

### 获取按权值排序的试题列表 (get) http://localhost:3000/subjectTitle/listWeigh/:limit  
(注: limit 是 Number 类型)

### 修改密码  (post) localhost:3000/user/updatePassword  
{
  pre_password: "xxx1"
  new_password: "xxx2"
}

### 修改试题考试时间 (post) localhost:3000/subjectTitle/updateExamTime
{
  titleId,
  examTime
}

## 上传图片 (post) localhost:3000/subjectTitle/upload/:titleId
(前端配合andtd Form表单的上传图片组件使用)


  ## 获取 banner 链接 & 位置 (get) localhost:3000/banner/list/:url (获取全部 banner url 填 all)

  ## 添加 banner （post) localhost:3000/banner/addBanner
 ```js
  {
    url: String
    position: Number
  }
```

ejs： localhost:3000/banner/bannerAdd

  ## 修改 banner （post) localhost:3000/banner/updateBanner
```js
  {
    preId: String
    newUrl: String
    position: Number
  }
```

ejs： localhost:3000/banner/bannerUpdate

  ## 删除 banner （post） localhost:3000/banner/delteBanner
  ```js
  {
    id: String
  }
  ```

ejs： localhost:3000/banner/bannerDel