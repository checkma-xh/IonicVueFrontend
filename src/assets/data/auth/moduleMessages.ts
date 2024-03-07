import router from "@/router";
import {
  logInOutline,
  logOutOutline,
  personAddOutline,
  personRemoveOutline,
} from "ionicons/icons";

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
    handleClick: () => {
      alert("logout");
    },
    icon: logOutOutline,
    cardColor: "light",
    iconColor: "medium",
    title: "logout",
    subtitle: "",
    content: "",
  },
  deactivateModuleStyle: {
    handleClick: () => {
      router.push({ name: "Deactivate" });
    },
    icon: personRemoveOutline,
    cardColor: "light",
    iconColor: "medium",
    title: "deactivate",
    subtitle: "",
    content: "",
  },
};
