import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import TabsPage from "@/views/TabsPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: TabsPage,
    children: [
      // 首页
      {
        path: "",
        redirect: "/plan-management",
      },
      {
        path: "plan-management",
        name: "PlanManagement",
        component: () => import("@/views/planManagement/PlanManagementPage.vue"),
      },

      // 计划管理模块 (新建计划、更新计划、删除计划、更新设置)(新建分组、删除分组、更新分组)
      // (查看回收站计划、查看待完成计划、查看分组下的计划、查看时间段内计划、查看已完成计划、检索计划)
      // 新建计划
      {
        path: "plan-management/users/:id(\\d+)/plans/create",
        name: "CreatePlan",
        component: () => import("@/views/planManagement/PlanEditPage.vue"),
      },
      // 设置计划
      // 查看回收站计划、查看完成计划、查看分组下的计划、查看时间段内计划、查看已完成计划
      {
        path: "plan-management/users/:id(\\d+)/plans",
        name: "PlanList",
        component: () => import("@/views/planManagement/PlanListPage.vue"),
      },
      // 检索计划


      // 身份验证模块  (注册)(登录、登出、注销)(刷新)
      {
        path: "auth",
        name: "Auth",
        component: () => import("@/views/auth/AuthPage.vue"),
      },
      // 注册页面
      {
        path: "auth/register",
        name: "Register",
        component: () => import("@/views/auth/RegisterPage.vue"),
      },
      // 登录页面
      {
        path: "auth/login",
        name: "Login",
        component: () => import("@/views/auth/LoginPage.vue"),
      },
      // 登出警示
      // 注销页面
      {
        path: "auth/deactivate",
        name: "Deactivate",
        component: () => import("@/views/auth/DeactivatePage.vue"),
      },
      // 刷新功能

      // 用户信息模块 (查看信息、修改邮箱、修改密码)
      {
        path: "user-info",
        name: "UserInfo",
        component: () => import("@/views/userInfo/UserInfoPage.vue"),
      },
      // 查看信息
      // 修改邮箱
      {
        path: "user-info/email",
        name: "EditEmail",
        component: () => import("@/views/userInfo/EditEmailPage.vue"),
      },
      // 修改密码
      {
        path: "user-info/password",
        name: "EditPassword",
        component: () => import("@/views/userInfo/EditPasswordPage.vue"),
      },
      // 修改头像
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
  strict: true,
});

export default router;
