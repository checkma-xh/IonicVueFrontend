import { useUserStore } from "@/store/userStore";
import {
	Camera,
	CameraResultType,
	CameraSource,
	Photo,
} from "@capacitor/camera";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { onMounted } from "vue";
import { ConfigService } from "./ConfigService";

const config = ConfigService.getConfig();

export function convertBlobToBase64(blob: Blob): Promise<string> {
	return new Promise<string>((resolve, reject) => {
		const reader = new FileReader();
		reader.onerror = reject;
		reader.onload = () => {
			resolve(reader.result as string);
		};
		reader.readAsDataURL(blob);
	});
}


export async function savePhoto(
	photo: Photo,
	filepath: string,
): Promise<boolean> {
	try {
		const response = await fetch(photo.webPath!);
		const blob = await response.blob();
		const base64Data = await convertBlobToBase64(blob);
		await Filesystem.writeFile({
			path: filepath,
			data: base64Data,
			directory: Directory.Data,
		});
		return true;
	} catch (error) {
		console.error("Unable to save photo:", error);
		return false;
	}
}

export async function deletePhoto(filepath: string): Promise<boolean> {
	try {
		await Filesystem.deleteFile({
			path: filepath,
			directory: Directory.Data,
		});
		return true;
	} catch (error) {
		console.error("Unable to delete photo:", error);
		return false;
	}
}


export async function loadPhoto(filepath: string) {
	try {
		const photo = await Filesystem.readFile({
			path: filepath,
			directory: Directory.Data,
		});
		return photo;
	} catch (error) {
		console.error("Unable to load photo:", error);
		return null;
	}
}


export async function takePhoto(): Promise<Photo | null> {
	try {
		const photo = await Camera.getPhoto({
			resultType: CameraResultType.Uri,
			source: CameraSource.Camera,
			quality: 100,
		});
		return photo;
	} catch (error) {
		console.error("Unable to take photo:", error);
		return null;
	}
}

onMounted(async () => {
	const photo = await loadPhoto(config.viteAvatarFileName);
	if (photo?.data) {
		const userStore = useUserStore();
		userStore.currentUser.avatarUrl = `data:image/jpeg;base64,${photo.data}`;
	}
});
