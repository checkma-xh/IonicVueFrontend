import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { IonicVue } from "@ionic/vue";
import { createPinia } from "pinia";
import persist from "pinia-plugin-persistedstate";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

/* Theme variables */
import "./assets/theme/variables.css";
import "reflect-metadata";

import { defineCustomElements } from "@ionic/pwa-elements/loader";
import { useUserStore } from "./store/userStore";
defineCustomElements( window );

const pinia = createPinia().use( persist );

const app = createApp( App ).use( IonicVue ).use( router ).use( pinia );

router.isReady().then( () => {
  app.mount( "#app" );
} );

// 用于测试, 初始化用户数据, 方便调试, 正式运行需要删除
import {login} from "@/api/auth/login";
const userStore = useUserStore();
const currentUser = userStore.currentUser;
const response = await login("checkmaxh@gmail.com", "#", "");

currentUser.id = response.currentUser.id;
currentUser.email = response.currentUser.email;
currentUser.passwordHash = response.currentUser.passwordHash;
currentUser.avatarUrl = response.currentUser.avatarUrl;
currentUser.activated = response.currentUser.activated;
userStore.accessToken = response.accessToken;
userStore.refreshToken = response.refreshToken;