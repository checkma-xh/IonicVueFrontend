import {
  logInOutline,
  logOutOutline,
  personAddOutline,
  personRemoveOutline,
} from "ionicons/icons";

export const moduleMessages = {
  registerModuleStyle: {
    handleClick: () => {
      alert("register");
    },
    icon: personAddOutline,
    color: "tertiary",
    title: "register",
    subtitle: "register",
    content: "good luck",
  },
  loginModuleStyle: {
    handleClick: () => {
      alert("login");
    },
    icon: logInOutline,
    color: "success",
    title: "login",
    subtitle: "login",
    content: "good luck",
  },
  logoutModuleStyle: {
    handleClick: () => {
      alert("logout");
    },
    icon: logOutOutline,
    color: "warning",
    title: "logout",
    subtitle: "logout",
    content: "good luck",
  },
  deactivateModuleStyle: {
    handleClick: () => {
      alert("deactivate");
    },
    icon: personRemoveOutline,
    color: "danger",
    title: "deactivate",
    subtitle: "deactivate",
    content: "good luck",
  },
};
