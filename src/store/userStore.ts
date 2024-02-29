import { defineStore, acceptHMRUpdate } from "pinia";
import { ref, reactive, nextTick } from "vue";

export const useUserStore = defineStore(
  "userStore",
  () => {
    let currentUser = reactive({
      email: "",
      passwordHash: "",
      avatarUrl: "https://ionicframework.com/docs/img/demos/avatar.svg",
      activated: false,
    });
    let accessToken = ref();
    let refreshToken = ref();

    async function reset() {
      currentUser = reactive({
        email: "",
        passwordHash: "",
        avatarUrl: "https://ionicframework.com/docs/img/demos/avatar.svg",
        activated: false,
      });
      accessToken = ref();
      refreshToken = ref();
      await nextTick();
    }

    return {
      currentUser,
      accessToken,
      refreshToken,
      reset,
    };
  },
  {
    persist: false,
  }
);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
