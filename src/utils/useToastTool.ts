import { toastController } from "@ionic/vue";


export async function showToast(
    message: string,
    duration: number,
    position: "top" | "bottom" | "middle" | undefined
) {
    const toast = await toastController.create({
        message: message,
        duration: duration,
        position: position,
    });
    toast.present();
}
