import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from "@capacitor/camera";
import { onMounted } from "vue";
import { Filesystem, Directory } from "@capacitor/filesystem";

// 定义头像文件常量
export const AVATAR_FILENAME = "userAvatar";

// 文件转 Base64 数据
export function convertBlobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.readAsDataURL(blob);
  });
}

// 保存图片
export async function savePhoto(photo: Photo, filepath: string) {
  try {
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
    const base64Data = await convertBlobToBase64(blob);

    await Filesystem.writeFile({
      path: filepath,
      data: base64Data.toString(),
      directory: Directory.Data,
    });
    return true;
  } catch (error) {
    console.error("Unable to save photo:", error);
    return false;
  }
}

// 加载图片
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

// 获取照片: 拍照, 选择图库照片
export async function takePhoto() {
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
  await loadPhoto(AVATAR_FILENAME);
});
