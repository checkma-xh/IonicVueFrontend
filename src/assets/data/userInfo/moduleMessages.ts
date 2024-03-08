import router from "@/router";
import { useUserStore } from "@/store/userStore";
import {
  loadPhoto,
  savePhoto,
  takePhoto,
} from "@/utils/usePhotoGallery";
import { eyeOutline, mailOutline, personCircleOutline } from "ionicons/icons";
import { ConfigService } from "@/utils/ConfigService";

const config = ConfigService.getConfig();
const userStore = useUserStore();
const currentUser = userStore.currentUser;

export const moduleMessages = {
  editEmailModuleStyle: {
    handleClick: () => {
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
      if (photo) {
        await savePhoto(photo, config.viteAvatarFileName);
        const readPhoto = await loadPhoto(config.viteAvatarFileName);
        currentUser.avatarUrl = `data:image/jpeg;base64,${readPhoto?.data}`;
      }
    },
    icon: personCircleOutline,
    cardColor: "light",
    iconColor: "primary",
    title: "edit avatar",
    subtitle: "",
    content: "",
  },
};
