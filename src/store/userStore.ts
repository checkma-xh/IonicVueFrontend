import { personCircleOutline } from "ionicons/icons";
import { defineStore, acceptHMRUpdate } from "pinia";
import { ref, reactive, nextTick } from "vue";

export const useUserStore = defineStore(
    "userStore",
    () => {
        let currentUser = reactive({
            id: 0,
            email: "checkma_xh@outlook.com",
            passwordHash: "",
            avatarUrl: personCircleOutline,
            activated: false,
        });
        let accessToken = ref();
        let refreshToken = ref();
        let islogin = ref(false);

        async function reset() {
            currentUser = reactive({
                id: 0,
                email: "",
                passwordHash: "",
                avatarUrl: personCircleOutline,
                activated: false,
            });
            accessToken = ref();
            refreshToken = ref();
            islogin = ref(false);
            await nextTick();
        }

        return {
            currentUser,
            accessToken,
            refreshToken,
            islogin,
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
