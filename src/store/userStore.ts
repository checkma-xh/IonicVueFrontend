import { personCircleOutline } from "ionicons/icons";
import { defineStore, acceptHMRUpdate } from "pinia";
import { ref, nextTick } from "vue";

export const useUserStore = defineStore(
	"userStore",
	() => {
		const id           = ref(0);
		const email        = ref("");
		const passwordHash = ref("");
		const avatar       = ref(personCircleOutline);
		const activated    = ref(false);
		const accessToken  = ref("");
		const refreshToken = ref("");
		const isLogin      = ref(false);

		async function reset() {
			id.value           = 0;
			email.value        = "";
			passwordHash.value = "";
			avatar.value       = "";
			activated.value    = false;
			accessToken.value  = "";
			refreshToken.value = "";
			isLogin.value      = false;
			await nextTick();
		}

		async function setConfig(
			{ argId = null,
				argEmail        = null,
				argPasswordHash = null,
				argAvatar       = null,
				argActivated    = null,
				argAccessToken  = null,
				argRefreshToken = null,
				argIsLogin      = null,
			}: {
				argId          ?: number | null,
				argEmail       ?: string | null,
				argPasswordHash?: string | null,
				argAvatar      ?: string | null,
				argActivated   ?: boolean | null,
				argAccessToken ?: string | null,
				argRefreshToken?: string | null,
				argIsLogin     ?: boolean | null,
			}) {
			if (argId) { id.value = argId; }
			if (argEmail) { email.value = argEmail; }
			if (argPasswordHash) { passwordHash.value = argPasswordHash; }
			if (argAvatar) { avatar.value = argAvatar; }
			if (argActivated) { activated.value = argActivated; }
			if (argAccessToken) { accessToken.value = argAccessToken; }
			if (argRefreshToken) { refreshToken.value = argRefreshToken; }
			if (argIsLogin) { isLogin.value = argIsLogin; }
			await nextTick();
		}

		return {
			id,
			email,
			passwordHash,
			avatar,
			activated,
			accessToken,
			refreshToken,
			isLogin,
			reset,
			setConfig,
		};
	},
	{
		persist: false,
	},
);

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
