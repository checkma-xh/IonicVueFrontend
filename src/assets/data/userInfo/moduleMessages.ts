import router from "@/router";
import { useUserStore } from "@/store/userStore";
import {
  loadPhoto,
  savePhoto,
  takePhoto,
} from "@/utils/usePhotoGallery";
import { eyeOutline, mailOutline, personCircleOutline } from "ionicons/icons";
import { ConfigService } from "@/utils/ConfigService";
import { editAvatarUrl } from "@/api/userInfo/editAvatarUrl";
import { showToast } from "@/utils/useToastTool";

const config = ConfigService.getConfig();
const userStore = useUserStore();
const currentUser = userStore.currentUser;

export const moduleMessages = {
  editEmailModuleStyle: {
    handleClick: async () => {
      router.push({ name: "EditEmail" });
    },
    icon: mailOutline,
    cardColor: "light",
    iconColor: "primary",
    title: "edit email",
    subtitle: "",
    content: "",
  },
  editPasswordModuleStyle: {
    handleClick: () => {
      router.push({ name: "EditPassword" });
    },
    icon: eyeOutline,
    cardColor: "light",
    iconColor: "primary",
    title: "edit password",
    subtitle: "",
    content: "",
  },
  editAvatarModuleStyle: {
    handleClick: async () => {
      const photo = await takePhoto();

      if (!photo) {
        return await showToast("image acquisition failed", 2000, "bottom");
      }

      await savePhoto(photo, config.viteAvatarFileName);
      const readPhoto = await loadPhoto(config.viteAvatarFileName);
      const targetAvatarUrl = `data:image/jpeg;base64,${readPhoto?.data}`;
      const response = await editAvatarUrl(userStore.accessToken, currentUser.id, targetAvatarUrl);
      await showToast(response.data.message, 2000, "bottom");

      if (response.status < 200 || response.status > 299) {
        await showToast(response.status, 2000, "bottom");
        return;
      }

      currentUser.avatarUrl = targetAvatarUrl;
    },
    icon: personCircleOutline,
    cardColor: "light",
    iconColor: "primary",
    title: "edit avatar",
    subtitle: "",
    content: "",
  },
};
