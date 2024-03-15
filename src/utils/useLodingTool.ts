
import { loadingController } from '@ionic/vue';


export async function showLoading(message: string = "loading...", duration: number = 2500) {
    const loading = await loadingController.create({
        message: message,
        duration: duration,
    });

    loading.present();
}