import {
  addOutline,
  calendarOutline,
  checkmarkOutline,
  fileTrayOutline,
  fileTrayStackedOutline,
  searchOutline,
  trashOutline,
} from "ionicons/icons";
import { modalController } from "@ionic/vue";
import SearchModal from "@/components/SearchModal.vue";

export const moduleMessages = {
  searchModuleStyle: {
    handleClick: async () => {
      const modal = await modalController.create({
        component: SearchModal,
      });
      modal.present();
    },
    icon: searchOutline,
    color: "primary",
    title: "search",
    subtitle: "-",
    content: "search your plans",
  },
  completedModuleStyle: {
    handleClick: () => {
      alert("completed");
    },
    icon: checkmarkOutline,
    color: "success",
    title: "completed",
    subtitle: "-",
    content: "completed plans",
  },
  unfinishedModuleStyle: {
    handleClick: () => {
      alert("unfinished");
    },
    icon: fileTrayOutline,
    color: "warning",
    title: "unfinished",
    subtitle: "-",
    content: "unfinished plans",
  },
  trashModuleStyle: {
    handleClick: () => {
      alert("trash");
    },
    icon: trashOutline,
    color: "dark",
    title: "trash",
    subtitle: "-",
    content: "deleted plans",
  },
  plansModuleStyle: {
    handleClick: () => {
      alert("plans");
    },
    icon: calendarOutline,
    color: "tertiary",
    title: "plans",
    subtitle: "-",
    content: "plans",
  },
  groupsModuleStyle: {
    handleClick: () => {
      alert("groups");
    },
    icon: fileTrayStackedOutline,
    color: "danger",
    title: "groups",
    subtitle: "-",
    content: "plans in groups",
  },
  createModuleStyle: {
    handleClick: () => {
      alert("create");
    },
    icon: addOutline,
    color: "medium",
    title: "create",
    subtitle: "-",
    content: "create new plan",
  },
};