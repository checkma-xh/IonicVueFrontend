# IonicVueFrontend  TodoList


1. 创建待办事项：(标题、备注、详细信息、分组)
2. 设置提醒时间：(通知)
3. 设置重复时间：(重复通知)
4. 本地通知：利用Ionic Native提供的插件实现本地通知功能
5. 标记完成： (已完成、待完成、未开始)
6. 事项分类： (分组)
7. 事项状态统计： (全部、计划、今日(9/10)、完成)
8. 云同步：(Redis、MySQL)
9. 白天夜晚主题

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
	userId        : int,
}
PATCH   /plan-management/users/<int:id>/plans/<int:id> # 完成计划
{
	completed     : int,
}
DELETE  /plan-management/users/<int:id>/plans/<int:id> # 删除计划
PATCH   /plan-management/users/<int:id>/plans/<int:id> # 更新设置
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
PATCH   /user-info/users/<int:id>/password-hash # 搭配 auth 验证码
{
	email        : string,
	passwordHash : string,
}
PATCH   /user-info/users/<int:id>/avatar-url
{
	avatarUrl    : string,
}
```

### auth 身份验证模块
```javascript
关联表: user_info
POST    /auth/login
{
	email            : string,
	passwordHash     : string,
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
	passwordHash    : string,
	avatarUrl       : string,
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

| **id** | **email**   | **password_hash** | **avatar_url** | **activated** |
| ------ | ----------- | ----------------- | -------------- | ------------- |
| bigint | varchar(64) | varchar(256)      | varchar(64)    | tinyint       |


### 计划信息表 plan_info

| **id** | **name**    | **remark**  | **group_name** | **repeat_name** | **priority_name** | **start_date** | **end_date** | **completed** | **deleted** | **user_id** |
| ------ | ----------- | ----------- | -------------- | --------------- | ----------------- | -------------- | ------------ | ------------- | ----------- | ----------- |
| bigint | varchar(64) | varchar(64) | varchar(64)    | varchar(64)     | varchar(64)       | date           | date         | tinyint       | tinyint     | bigint      |

### 分组信息表 group_info

| **id** | **name**    | **remark**  | **user_id** |
| ------ | ----------- | ----------- | ----------- |
| bigint | varchar(64) | varchar(64) | bigint      |

### 计划等级表 priority_info

| **id** | **name**    | **remark**  |
| ------ | ----------- | ----------- |
| bigint | varchar(64) | varchar(64) |

### 重复频率表 repeat_info

| **id** | **name**    | **remark**  |
| ------ | ----------- | ----------- |
| bigint | varchar(64) | varchar(64) |
