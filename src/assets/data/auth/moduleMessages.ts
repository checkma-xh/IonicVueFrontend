import { verificationCodeRequest } from "@/api/auth/verificationCodeRequest";
import router from "@/router";
import { useUserStore } from "@/store/userStore";
import { showToast } from "@/utils/useToastTool";
import { actionSheetController } from "@ionic/vue";
import {
  logInOutline,
  logOutOutline,
  personAddOutline,
  personRemoveOutline,
} from "ionicons/icons";
import { reactive } from "vue";

const userStore = useUserStore();
const currentUser = userStore.currentUser;

const actionSheetOptions = reactive({
  header: "deactivate",
  buttons: [
    {
      text: "confirm",
      role: "destructive",
      data: {
        action: "confirm",
      },
      handler: async () => {
        await showToast("success", 2000, "bottom");
      },
    },
    {
      text: "cancel",
      role: "cancel",
      data: {
        action: "cancel",
      },
    },
  ],
});

export const moduleMessages = {
  registerModuleStyle: {
    handleClick: () => {
      router.push({ name: "Register" });
    },
    icon: personAddOutline,
    cardColor: "light",
    iconColor: "primary",
    title: "register",
    subtitle: "",
    content: "",
  },
  loginModuleStyle: {
    handleClick: () => {
      router.push({ name: "Login" });
    },
    icon: logInOutline,
    cardColor: "light",
    iconColor: "primary",
    title: "login",
    subtitle: "",
    content: "",
  },
  logoutModuleStyle: {
    handleClick: async () => {
      const actionSheet = await actionSheetController.create(actionSheetOptions);
      actionSheet.present();
    },
    icon: logOutOutline,
    cardColor: "light",
    iconColor: "medium",
    title: "logout",
    subtitle: "",
    content: "",
  },
  deactivateModuleStyle: {
    handleClick: async () => {
      router.push({ name: "Deactivate" });
      const response = await verificationCodeRequest(currentUser.email);
      await showToast(response.data.message, 2000, "bottom");
    },
    icon: personRemoveOutline,
    cardColor: "light",
    iconColor: "medium",
    title: "deactivate",
    subtitle: "",
    content: "",
  },
};
