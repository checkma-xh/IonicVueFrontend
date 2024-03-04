import { useUserStore } from "@/store/userStore";
import {
    Camera,
    CameraResultType,
    CameraSource,
    Photo,
} from "@capacitor/camera";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { onMounted } from "vue";

// 定义头像文件常量
export const AVATAR_FILENAME = "userAvatar";

/**
 * 将 Blob 对象转换为 Base64 数据
 * @param blob Blob 对象
 * @returns 包含 Base64 数据的 Promise
 */
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

/**
 * 保存照片到文件系统
 * @param photo 要保存的照片
 * @param filepath 文件路径
 * @returns 保存成功返回 true，否则返回 false
 */
export async function savePhoto(
    photo: Photo,
    filepath: string
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

/**
 * 删除指定路径的照片文件
 * @param filepath 文件路径
 * @returns 删除成功返回 true，否则返回 false
 */
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

/**
 * 加载指定路径的照片文件
 * @param filepath 文件路径
 * @returns 加载成功返回照片文件内容，否则返回 null
 */
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

/**
 * 拍摄照片或从图库中选择照片
 * @returns 拍摄或选择的照片，若操作失败则返回 null
 */
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

// 组件挂载后尝试加载头像照片
onMounted(async () => {
    const photo = await loadPhoto(AVATAR_FILENAME);
    if (photo?.data) {
        const userStore = useUserStore();
        userStore.currentUser.avatarUrl = `data:image/jpeg;base64,${photo.data}`;
    }
});
