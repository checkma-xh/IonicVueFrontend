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
    route: "/user-info/users/:id/password",
    controller: UserInfoController,
    action: "editPassword",
  },
  {
    method: "patch",
    route: "/user-info/users/:id/avatar",
    controller: UserInfoController,
    action: "editAvatar",
  },

  // Auth
  {
    method: "post",
    route: "/auth/register",
    controller: AuthController,
    action: "register",
  },
  {
    method: "post",
    route: "/auth/login",
    controller: AuthController,
    action: "login",
  },
  {
    method: "post",
    route: "/auth/logout",
    controller: AuthController,
    action: "logout",
  },
  {
    method: "post",
    route: "/auth/refresh",
    controller: AuthController,
    action: "refresh",
  },
  {
    method: "post",
    route: "/auth/deactivate",
    controller: AuthController,
    action: "deactivate",
  },
  {
    method: "post",
    route: "/auth/verification-code/request",
    controller: AuthController,
    action: "verificationCodeRequest",
  },
  {
    method: "post",
    route: "/auth/verification-code/verify",
    controller: AuthController,
    action: "verificationCodeVerify",
  },

  // PlanManagement
  {
    method: "post",
    route: "/plan-management/users/:id/plans",
    controller: PlanManagementController,
    action: "createPlan",
  },
  {
    method: "get",
    route: "/plan-management/users/:userId/plans/:planId",
    controller: PlanManagementController,
    action: "getPlan",
  },
  {
    method: "patch",
    route: "/plan-management/users/:userId/plans/:planId",
    controller: PlanManagementController,
    action: "completePlan",
  },
  {
    method: "delete",
    route: "/plan-management/users/:userId/plans/:planId",
    controller: PlanManagementController,
    action: "deletePlan",
  },
  {
    method: "put",
    route: "/plan-management/users/:userId/plans/:planId",
    controller: PlanManagementController,
    action: "setPlan",
  },
  {
    method: "get",
    route: "/plan-management/users/:id/plans",
    controller: PlanManagementController,
    action: "getPlans",
  },
  {
    method: "post",
    route: "/plan-management/users/:id/groups",
    controller: PlanManagementController,
    action: "createGroup",
  },
  {
    method: "get",
    route: "/plan-management/users/:id/groups",
    controller: PlanManagementController,
    action: "getGroups",
  },
  {
    method: "delete",
    route: "/plan-management/users/:userId/groups/:groupId",
    controller: PlanManagementController,
    action: "deleteGroup",
  },
  {
    method: "put",
    route: "/plan-management/users/:userId/groups/:groupId",
    controller: PlanManagementController,
    action: "setGroup",
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
