import {
  addCircle,
  calendarOutline,
  searchOutline,
  trashOutline,
} from "ionicons/icons";
import { modalController } from "@ionic/vue";
import SearchModal from "@/components/SearchModal.vue";
import router from "@/router";
import { useUserStore } from "@/store/userStore";

const userStore = useUserStore();
const currentUser = userStore.currentUser;

export const moduleMessages = {
  searchModuleStyle: {
    handleClick: async () => {
      const modal = await modalController.create({
        component: SearchModal,
      });
      modal.present();
    },  
    icon: searchOutline,
    cardColor: "light",
    iconColor: "dark",
    title: "search",
    subtitle: "",
    content: "",
  },
  trashModuleStyle: {
    handleClick: () => {
      alert("trash");
    },
    icon: trashOutline,
    cardColor: "light",
    iconColor: "medium",
    title: "trash",
    subtitle: "",
    content: "",
  },
  plansModuleStyle: {
    handleClick: async () => {
      await router.push({ name: "PlanList", params: { id: currentUser.id }, query: { completed: 1} });
    },
    icon: calendarOutline,
    cardColor: "light",
    iconColor: "danger",
    title: "plans",
    subtitle: "",
    content: "",
  },
  createModuleStyle: {
    handleClick: async () => {
      await router.push({ name: "CreatePlan", params: { id: currentUser.id } });
    },
    icon: addCircle,
    cardColor: "light",
    iconColor: "primary",
    title: "create",
    subtitle: "",
    content: "",
  },
};
