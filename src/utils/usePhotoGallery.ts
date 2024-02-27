import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from "@capacitor/camera";
import { ref } from "vue";
import { Filesystem, Directory } from "@capacitor/filesystem";

// 定义头像类
export interface Avatar {
  filepath: string;
  webviewPath?: string;
}

// 头像文件
export const avatarPhoto = ref<Avatar>({
  filepath: "",
  webviewPath: "https://ionicframework.com/docs/img/demos/avatar.svg",
});

// 辅助函数, 文件转 Base64 数据
export async function convertBlobToBase64(blob: Blob) {
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
}

// 保存图片
export async function savedFileImage(photo: Photo, fileName: string) {
  const response = await fetch(photo.webPath!);
  const blob = await response.blob();
  const base64Data = await convertBlobToBase64(blob);

  Filesystem.writeFile({
    path: fileName,
    data: String(base64Data),
    directory: Directory.Data,
  });

  return {
    filepath: fileName,
    webviewPath: photo.webPath,
  };
}

// 加载图片
export async function loadFileImage(fileName: string): Promise<string | null> {
  const file = await Filesystem.readFile({
    path: fileName,
    directory: Directory.Data,
  });
  // 将文件内容转换为 base64 格式的数据 URI
  const base64DataUri = `data:image/jpeg;base64,${file.data}`;
  return base64DataUri;
}

// 获取照片: 拍照, 选择图库照片
export const takePhoto = async (): Promise<void> => {
  const photo = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
    source: CameraSource.Camera,
    quality: 100,
  });
  avatarPhoto.value = await savedFileImage(photo, "avatar.jpeg");
};
