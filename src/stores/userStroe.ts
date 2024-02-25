import { defineStore } from "pinia";
import { computed, ref, reactive, nextTick } from "vue";
import axios from "axios";

export const useUserStore = defineStore(
  "userStore",
  () => {
    let currentUser = reactive({});
    const accessToken = ref(null);
    const refreshToken = ref(null);

    async function reset() {
      currentUser = {};
      accessToken.value = null;
      refreshToken.value = null;
      await nextTick();
    }

    async function login(account: string, password: string) {
      try {
        const postData = {
          account: account,
          password: password,
        };
        const response = await axios.post(
          "https://120.24.177.83/auth/login",
          postData
        );
        currentUser = response.data.currentUser;
        accessToken.value = response.data.accessToken;
        refreshToken.value = response.data.refreshToken;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    async function refresh() {
      try {
        const postData = { refreshToken: refreshToken };
        const response = await axios.post(
          "https://120.24.177.83/auth/refresh",
          postData
        );
        accessToken.value = response.data.accessToken;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    async function logout() {
      try {
        const postData = { accessToken: accessToken };
        const response = await axios.post(
          "https://120.24.177.83/auth/logout",
          postData
        );
        reset();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    async function deactivate() {
      try {
        const postData = { accessToken: accessToken };
        const response = await axios.post(
          "https://120.24.177.83/auth/deactivate",
          postData
        );
        reset();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    async function register(account: string, password: string, name: string) {
      try {
        const postData = {
          account: account,
          password: password,
          name: name,
        };
        const response = await axios.post(
          "https://120.24.177.83/auth/register",
          postData
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    return {
      currentUser,
      accessToken,
      refreshToken,
      login,
      refresh,
      logout,
      deactivate,
      register,
    };
  },
  {
    persist: true,
  }
);
