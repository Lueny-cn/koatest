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

### 列出所有选项
+ method: get
+ url: http://localhost:3000/subjectItemType/list
+ result:

1. 成功:
````json
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


