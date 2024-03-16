# IonicVueFrontend

1. 创建待办事项：(标题、备注、详细信息、分组)
4. 设置提醒时间：(通知)
5. 设置重复时间：(重复通知)
6. 本地通知：利用Ionic Native提供的插件实现本地通知功能
7. 标记完成： (已完成、待完成、未开始)
8. 事项分类： (分组)
9. 事项状态统计： (全部、计划、今日(9/10)、完成)
10. 云同步：(Redis、MySQL)
11. 白天夜晚主题

### plan-management 计划管理模块

```javascript
关联表: plan_info, group_info, priority_info, repeat_info
POST    /plan-management/users/<int:id>/plans          # 新建计划
{
	name          : string,
	remark        : string,
	groupName     : string,
	repeatName    : string,
	priorityName  : string,
	startDate     : string,
	endDate       : string,
}
PATCH   /plan-management/users/<int:id>/plans/<int:id> # 完成计划
	completed     : int,
}
DELETE  /plan-management/users/<int:id>/plans/<int:id> # 删除计划
PUT     /plan-management/users/<int:id>/plans/<int:id> # 更新设置
{
	name          : string,
	remark        : string,
	groupName     : string,
	repeatName    : string,
	priorityName  : string,
	startDate     : string,
	endDate       : string,
}
POST    /plan-management/users/<int:id>/groups   # 新建分组
{
	name   : string,
	remark : string,
	userId : int
}
DELETE  /plan-management/users/<int:id>/groups   # 删除分组
PATHCH  /plan-management/users/<int:id>/groups   # 更新分组
{
	name   : string,
	remark : string,
}
GET     /plan-management/users/<int:id>/groups
GET     /plan-management/users/<int:id>/plans?deleted=<bool>
GET     /plan-managements/users/<int:id>/plans?group-name=<string>
GET     /plan-management/users/<int:id>/plans?start-date=<string>&end-date=<string> # 查看时间段计划
GET     /plan-management/users/<int:id>/plans?completed=true&deleted=false
GET     /plan-management/users/<int:id>/plans?name=<string>&remark=<string>
```

### user-info 用户信息模块

```javascript
关联表: user_info
GET     /user-info/users/<int:id>
PATCH   /user-info/users/<int:id>/email         # 搭配 auth 验证码
{
	newEmail : string,
	oldEmail : string,
}
PATCH   /user-info/users/<int:id>/password      # 搭配 auth 验证码
{
	email        : string,
	password     : string,
}
PATCH   /user-info/users/<int:id>/avatar
{
	avatar       : string,
}
```

### auth 身份验证模块

```javascript
关联表: user_info
POST    /auth/login
{
	email            : string,
	password         : string,
	verificationCode : string,
}
POST    /auth/refresh
POST    /auth/logout
POST    /auth/deactivate
{
	email            : string,
	verificationCode : string,
}
POST    /auth/register
{
	email           : string,
	password        : string,
	avatar          : string,
	verificationCode: string,
}
POST    /auth/verification-code/request
{
	email    : string,
}
POST    /auth/verification-code/verify
{
	email            : string,
	verificationCode : string,
}
```

### 用户信息表 user_info

| **id** | **email** | **password** | **avatar** | **activated** |
| ------------ | --------------- | ------------------ | ---------------- | ------------------- |
| bigint       | varchar(256)    | varchar(256)       | text             | tinyint             |

### 计划信息表 plan_info

| **id** | **name** | **remark** | **groupId** | **repeatId** | **priorityId** | **startDate** | **endDate** | **completed** | **deleted** | **userId** |
| ------------ | -------------- | ---------------- | ----------------- | ------------------ | -------------------- | ------------------- | ----------------- | ------------------- | ----------------- | ---------------- |
| bigint       | varchar(256)   | varchar(256)     | bigint            | bigint             | bigint               | date                | date              | tinyint             | tinyint           | bigint           |

### 分组信息表 group_info

| **id** | **name** | **remark** | **userId** |
| ------------ | -------------- | ---------------- | ---------------- |
| bigint       | varchar(256)   | varchar(256)     | bigint           |

### 计划等级表 priority_info

| **id** | **name** | **remark** |
| ------------ | -------------- | ---------------- |
| bigint       | varchar(256)   | varchar(256)     |

### 重复频率表 repeat_info

| **id** | **name** | **remark** |
| ------------ | -------------- | ---------------- |
| bigint       | varchar(256)   | varchar(256)     |
