# Ionic_Frontend

> 设想

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
plan_info, group_info, priority_info, repeat_info
POST    /plan-management/users/<int:id>/plans          # 新建计划
{
	name              : string,
	remark            : string,
	group_name        : string,
	repeat_name       : string,
	priority_name     : string,
	start_datetime    : string,
	end_datetime      : string,
}
PATCH   /plan-management/users/<int:id>/plans/<int:id> # 更新计划状态
{
	completed         : bool,
}
DELETE  /plan-management/users/<int:id>/plans/<int:id> # 删除计划
PATCH   /plan-management/users/<int:id>/plans/<int:id> # 更新计划设置
{
	name              : string,
	remark            : string,
	group_name        : string,
	repeat_name       : string,
	priority_name     : string,
	start_datetime    : string,
	end_datetime      : string,
}
POST    /plan-management/users/<int:id>/groups   # 新建分组
{
	name   : string,
	remark : string,
}
DELETE  /plan-management/users/<int:id>/groups   # 删除分组
PATHCH  /plan-management/users/<int:id>/groups   # 更新分组
{
	name   : string,
	remark : string,
}
```

### plan-analysis 计划分析模块

```javascript
plan_info
GET     /plan-analysis/users/<int:id>/plans?deleted=<bool>
GET     /plan-analysis/users/<int:id>/plans?group-name=<string>
GET     /plan-analysis/users/<int:id>/plans?start-datetime=<string>&end-datetime=<string> # 查看时间段计划
GET     /plan-analysis/users/<int:id>/plans?completed=<bool>&deleted=false
```

### user-info-management 用户信息管理模块

```javascript
user_info
GET     /userinfo/users/<int:id>
POST    /userinfo/users
{
	username : string,
	account  : string,
	password : string,
	avatar   : file,
	remark   : string,
}
PATCH   /userinfo/users/<int:id>/name
{
	name     : string,
}
PATCH   /userinfo/users/<int:id>/account
{
	account  : string,
}
PATCH   /userinfo/users/<int:id>/password
{
	password : string,
}
DELETE  /userinfo/users/<int:id>
```

### auth 身份验证模块

```javascript
user_info
POST    /auth/login
{
	account  : string,
	password : string,
}
POST    /auth/refresh
{
	refresh_token : string,
}
POST    /auth/logout
{
	access_token  : string,
}
```

### 用户信息表 user_info

| **id** | **account** | **name** | **password_hash** | **remark** | **avatar_url** |
| ------------ | ----------------- | -------------- | ----------------------- | ---------------- | -------------------- |
| bigint       | varchar(64)       | varchar(64)    | varchar(256)            | varchar(64)      | varchar(64)          |

### 计划信息表 plan_info

| **id** | **name** | **remark** | **group_name** | **repeat_name** | **priority_name** | **start_datetime** | **end_datetime** | **completed** | **deleted** |
| ------------ | -------------- | ---------------- | -------------------- | --------------------- | ----------------------- | ------------------------ | ---------------------- | ------------------- | ----------------- |
| bigint       | varchar(64)    | varchar(64)      | varchar(64)          | varchar(64)           | varchar(64)             | datetime                 | datetime               | tinyint             | tinyint           |

### 分组信息表 group_info

| **id** | **name** | **remark** | **user_id** |
| ------------ | -------------- | ---------------- | ----------------- |
| bigint       | varchar(64)    | varchar(64)      | bigint            |

### 计划等级表 priority_info

| **id** | **name** | **remark** |
| ------------ | -------------- | ---------------- |
| int          | varchar(64)    | varchar(64)      |

### 重复频率表 repeat_info

| **id** | **name** | **remark** |
| ------------ | -------------- | ---------------- |
| int          | varchar(64)    | varchar(64)      |
