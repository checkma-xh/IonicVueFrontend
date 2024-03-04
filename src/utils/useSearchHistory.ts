import { Directory, Encoding, Filesystem } from "@capacitor/filesystem";

// 定义历史记录常量
export const SEARCH_HISTORY_FILENAME = "searchHistory";
export const MAX_HISTORY_RECORDS = 20;

// 定义历史记录类型
export interface SearchHistory {
    datetime: Date;
    content: string;
}

// 获取历史记录
export async function getSearchHistory(): Promise<SearchHistory[]> {
    try {
        const { data } = await Filesystem.readFile({
            path: SEARCH_HISTORY_FILENAME,
            directory: Directory.Data,
            encoding: Encoding.UTF8,
        });
        const SearchHistoryArray: SearchHistory[] = JSON.parse(data.toString());
        return SearchHistoryArray;
    } catch (error) {
        console.error("Error reading file:", error);
        return [];
    }
}

// 排序历史记录
export async function sortSearchHistory(targetIndex: number): Promise<boolean> {
    if (targetIndex < 0 || targetIndex > MAX_HISTORY_RECORDS - 1) {
        return false;
    }
    try {
        const data = await getSearchHistory();
        const content = {
            datetime: new Date(),
            content: data.splice(targetIndex, 1)[0].content,
        };
        data.unshift(content);
        await Filesystem.writeFile({
            path: SEARCH_HISTORY_FILENAME,
            data: JSON.stringify(data),
            directory: Directory.Data,
            encoding: Encoding.UTF8,
        });
        return true;
    } catch (error) {
        console.error("Error sorting to file:", error);
        return false;
    }
}

// 插入历史记录
export async function unshiftSearchHistory(
    targetHistory: SearchHistory
): Promise<boolean> {
    try {
        const data = await getSearchHistory();
        data.unshift(targetHistory);
        await Filesystem.writeFile({
            path: SEARCH_HISTORY_FILENAME,
            data: JSON.stringify(data.slice(0, MAX_HISTORY_RECORDS)),
            directory: Directory.Data,
            encoding: Encoding.UTF8,
        });
        return true;
    } catch (error) {
        console.error("Error left appending to file:", error);
        return false;
    }
}

// 删除历史记录
export async function deleteSearchHistory(
    targetIndex: number
): Promise<boolean> {
    try {
        const data = await getSearchHistory();
        data.splice(targetIndex, 1);
        await Filesystem.writeFile({
            path: SEARCH_HISTORY_FILENAME,
            data: JSON.stringify(data),
            directory: Directory.Data,
            encoding: Encoding.UTF8,
        });
        return true;
    } catch (error) {
        console.error("Error deleting to file:", error);
        return false;
    }
}

// 清空历史记录
export async function clearSearchHistory(): Promise<boolean> {
    try {
        await Filesystem.writeFile({
            path: SEARCH_HISTORY_FILENAME,
            data: JSON.stringify([]),
            directory: Directory.Data,
            encoding: Encoding.UTF8,
        });
        return true;
    } catch (error) {
        console.error("Error clearing to file:", error);
        return false;
    }
}
