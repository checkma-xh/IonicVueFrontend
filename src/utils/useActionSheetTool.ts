import { actionSheetController } from "@ionic/vue";


export async function showActionSheet(
    header: string,
    buttons: any[]
) {
    const actionSheet = await actionSheetController.create({
        header: header,
        buttons: buttons,
    });
    actionSheet.present();
}
