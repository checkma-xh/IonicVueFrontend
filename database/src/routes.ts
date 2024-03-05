import { UserInfoController } from "./controller/UserInfoController";
import { PlanManagementController } from "./controller/PlanManagementController";
import { OtherController } from "./controller/OtherController";
import { AuthController } from "./controller/AuthController";

export const Routes = [
  // UserInfo
  {
    method: "get",
    route: "/user-info/users/:id",
    controller: UserInfoController,
    action: "getUserInfo",
  },
  {
    method: "patch",
    route: "/user-info/users/:id/email",
    controller: UserInfoController,
    action: "editEmail",
  },
  {
    method: "patch",
    route: "/user-info/users/:id/password-hash",
    controller: UserInfoController,
    action: "editPasswordHash",
  },
  {
    method: "patch",
    route: "/user-info/users/:id/avatar-url",
    controller: UserInfoController,
    action: "editAvatarUrl",
  },

  // Auth
  {
    method: "post",
    route: "/auth/login",
    controller: AuthController,
    action: "login",
  },


  // PlanManagement
  {
    method: "get",
    route: "/plan-management/users/:id/groups",
    controller: PlanManagementController,
    action: "getGroups",
  },

  // Other
  {
    method: "get",
    route: "/other/priorities",
    controller: OtherController,
    action: "getPriorities",
  },
  {
    method: "get",
    route: "/other/repeats",
    controller: OtherController,
    action: "getRepeats",
  },
];
