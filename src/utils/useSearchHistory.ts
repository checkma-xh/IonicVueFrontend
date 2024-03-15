import { ConfigService } from "./ConfigService";
import { deleteTextFile, getTextFile, rewriteTextFile } from "./useTextFileTool";

const config = ConfigService.getConfig();

// 定义历史记录类型
export interface SearchHistory {
  datetime: Date;
  content: string;
}

export async function getSearchHistory(): Promise<SearchHistory[] | null> {
  const data = await getTextFile(config.viteSearchHistoryPath);
  if (!data) {
    return null;
  }

  return JSON.parse(data.toString());
}

// 排序历史记录
export async function sortSearchHistory(targetIndex: number): Promise<boolean> {
  if (targetIndex < 0 || targetIndex > config.viteMaxHistoryRecords - 1) {
    return false;
  }

  const data = await getSearchHistory();
  if (!data) {
    return false;
  }

  const content = {
    datetime: new Date(),
    content: data.splice(targetIndex, 1)[0].content,
  };
  data.unshift(content);

  const rewriteResult = await rewriteTextFile(config.viteSearchHistoryPath, JSON.stringify(data));
  return rewriteResult;
}
Intl.DateTimeFormat().resolvedOptions().timeZone; 
// 插入历史记录
export async function unshiftSearchHistory(targetHistory: SearchHistory): Promise<boolean> {
  const data = await getSearchHistory();
  if (!data) {
    return false;
  }

  data.unshift(targetHistory);
  const newData = data.slice(0, config.viteMaxHistoryRecords);
  const rewriteResult = await rewriteTextFile(config.viteSearchHistoryPath, JSON.stringify(newData));
  return rewriteResult;
}

// 删除历史记录
export async function deleteSearchHistory(targetIndex: number): Promise<boolean> {
  const data = await getSearchHistory();
  if (!data) {
    return false;
  }

  data.splice(targetIndex, 1);
  const rewriteResult = await rewriteTextFile(config.viteSearchHistoryPath, JSON.stringify(data));
  return rewriteResult;
}

// 删除记录文件
export async function clearSearchHistory(): Promise<boolean> {
  const deleteResult = await deleteTextFile(config.viteSearchHistoryPath);
  return deleteResult;
}
