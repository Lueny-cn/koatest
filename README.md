##题库一级目录类型
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

### 获取所有 subjectType
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
      "typename": "时间段1"
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

## 题库二级选项 subjectItem


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

### 获取导航目录数据

+ method: get
+ url: http://localhost:3000/subjectItemType/list
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

