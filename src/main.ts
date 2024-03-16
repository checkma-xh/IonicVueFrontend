import { createApp, ref } from "vue";
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
defineCustomElements(window);

const pinia = createPinia().use(persist);

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(pinia);

router.isReady().then(() => {
  app.mount("#app");
});


import { Preferences } from "@capacitor/preferences";
import { ConfigService } from "./utils/ConfigService";
import { refresh } from "./api/auth/refresh";
import { useUserStore } from "./store/userStore";
import { deleteTextFile } from "./utils/useTextFileTool";
import { deleteSearchHistory } from "./utils/useSearchHistory";
import { showToast } from "./utils/useToastTool";

const config = ConfigService.getConfig();
const userStore = useUserStore();

let regularRefresh = setTimeout(async function func() {
  const readResult   = await Preferences.get({ key: config.viteUserRefreshTokenPath });
  const refreshToken = readResult.value ? readResult.value : "";
  const response     = await refresh(refreshToken);

  if (response.status < 200 || response.status > 299) {
    await userStore.reset();
    await Preferences.remove({ key: config.viteUserRefreshTokenPath });
    await deleteTextFile(config.viteUserAvatarPath);
    await deleteSearchHistory();
    await showToast("please login again", 2000, "bottom");
    router.push({ name: "Login" });
    regularRefresh = setTimeout(func, 3600000);
    return;
  }

  await userStore.setConfig({
    argId          : response.data.id as number,
    argEmail       : response.data.email as string,
    argPassword    : response.data.password as string,
    argAvatar      : response.data.argAvatar as string,
    argActivated   : response.data.activated as boolean,
    argAccessToken : response.data.accessToken as string,
    argRefreshToken: refreshToken,
    argIsLogin     : true,
  });

  const refreshTime = response.data.accessTokenExpiration - 60;
  regularRefresh = setTimeout(func, refreshTime * 1000);
}, 100);
