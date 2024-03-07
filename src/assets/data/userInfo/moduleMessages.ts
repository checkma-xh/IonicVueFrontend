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
        await savePhoto(photo, AVATAR_FILENAME);
        const readPhoto = await loadPhoto(AVATAR_FILENAME);
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
