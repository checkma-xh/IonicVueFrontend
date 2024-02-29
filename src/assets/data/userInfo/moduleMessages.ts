import { eyeOutline, mailOutline } from "ionicons/icons";

export const moduleMessages = {
  editEmailModuleStyle: {
    handleClick: () => {
      alert("edit email");
    },
    icon: mailOutline,
    color: "dark",
    title: "edit email",
    subtitle: "edit email",
    content: "good luck",
  },
  editPasswordModuleStyle: {
    handleClick: () => {
      alert("edit password");
    },
    icon: eyeOutline,
    color: "danger",
    title: "edit password",
    subtitle: "edit password",
    content: "good luck",
  },
};
