import router from "@/router";
import { useUserStore } from "@/store/userStore";
import {
  loadPhoto,
  savePhoto,
  takePhoto,
} from "@/utils/usePhotoGallery";
import { eyeOutline, mailOutline, personCircleOutline } from "ionicons/icons";


const userStore = useUserStore();
const currentUser = userStore.currentUser;
const AVATAR_FILENAME = import.meta.env.VITE_AVATAR_FILENAME;

export const moduleMessages = {
  editEmailModuleStyle: {
    handleClick: () => {
      router.push({ name: "EditEmail" });
    },
    icon: mailOutline,
    color: "dark",
    title: "edit email",
    subtitle: "edit email",
    content: "good luck",
  },
  editPasswordModuleStyle: {
    handleClick: () => {
      router.push({ name: "EditPassword" });
    },
    icon: eyeOutline,
    color: "danger",
    title: "edit password",
    subtitle: "edit password",
    content: "good luck",
  },
  editAvatarModuleStyle: {
    handleClick: async () => {
      const photo = await takePhoto();
      if (photo) {
        await savePhoto(photo, AVATAR_FILENAME);
        const readPhoto = await loadPhoto(AVATAR_FILENAME);
        currentUser.avatarUrl = `data:image/jpeg;base64,${readPhoto?.data}`;
      }
    },
    icon: personCircleOutline,
    color: "light",
    title: "edit avatar",
    subtitle: "edit avatar",
    content: "good luck",
  },
};
