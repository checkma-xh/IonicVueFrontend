import { Directory, Encoding, Filesystem } from "@capacitor/filesystem";

export async function getTextFile(filePath: string): Promise<string | Blob | null> {
  try {
    const { data } = await Filesystem.readFile({
      path: filePath,
      directory: Directory.Data,
      encoding: Encoding.UTF8,
    });
    return data;
  } catch (error) {
    console.error("error reading file:", error);
    return null;
  }
}

export async function rewriteTextFile(filePath: string, content: string): Promise<boolean> {
  try {
    await Filesystem.writeFile({
      path: filePath,
      data: content,
      directory: Directory.Data,
      encoding: Encoding.UTF8,
    });
    return true;
  } catch (error) {
    console.error("error left rewrite to file:", error);
    return false;
  }
}

export async function deleteTextFile(filePath: string): Promise<boolean> {
  try {
    await Filesystem.deleteFile({
      path: filePath,
      directory: Directory.Data,
    });
    return true;
  } catch (error) {
    console.error("error deleting to file:", error);
    return false;
  }
}
