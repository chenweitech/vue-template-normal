import Mock from 'mockjs';

Mock.mock('/API/getPermissions', "get", {
  "code": 0,
  "data": {
    "username": "@CNAME",
    "permissionList": [
      {
        "id": 1, // 路由id
        "name": "导航一",
        "p_id": null,
        "route": "page1"
      },
      {
        "id": 2,
        "name": "标签一",
        "p_id": 1,
        "route": "page1-1"
      },
      {
        "id": 3,
        "name": "标签二",
        "p_id": 1,
        "route": "page1-2"
      }
    ]
  }
})