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
        redirect: "/home",
      },
      {
        path: "home",
        name: "Home",
        component: () => import("@/views/HomePage.vue"),
      },

      // 身份验证模块  (注册)(登录、登出、注销)(刷新)
      { 
        path: "auth",
        name: "Auth",
        component: () => import("@/views/AuthPage.vue"),
      },

      // 用户信息模块 (查看信息、修改用户名、修改账号、修改密码)
      {
        path: "user-info",
        name: "UserInfo",
        component: () => import("@/views/UserInfoPage.vue"),
      },

      // // 计划分析模块 (查看回收站计划、查看待完成计划、查看分组下的计划、查看时间段内计划、查看已完成计划、检索计划)
      // {
      //   path: "plan-analysis",
      //   name: "PlanAnalysis",
      //   component: HomePage,
      // },

      // // 计划管理模块 (新建计划、更新计划状态、删除计划、更新计划设置)(新建分组、删除分组、更新分组)
      // {
      //   path: "plan-management",
      //   name: "PlanManagement",
      //   component: HomePage,
      // }
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
  strict: true,
});

export default router;
