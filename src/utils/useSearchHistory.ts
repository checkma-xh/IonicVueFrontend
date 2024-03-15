import { Directory, Encoding, Filesystem } from "@capacitor/filesystem";
import { ConfigService } from "./ConfigService";

const config = ConfigService.getConfig();

// 定义历史记录类型
export interface SearchHistory {
  datetime: Date;
  content: string;
}

// 获取历史记录
export async function getSearchHistory (): Promise<SearchHistory[]> {
  try {
    const { data } = await Filesystem.readFile( {
      path: config.viteSearchHistoryFileName,
      directory: Directory.Data,
      encoding: Encoding.UTF8,
    } );
    const SearchHistoryArray: SearchHistory[] = JSON.parse( data.toString() );
    return SearchHistoryArray;
  } catch ( error ) {
    console.error( "error reading file:", error );
    return [];
  }
}

// 排序历史记录
export async function sortSearchHistory ( targetIndex: number ): Promise<boolean> {
  if ( targetIndex < 0 || targetIndex > config.viteMaxHistoryRecords - 1 ) {
    return false;
  }
  try {
    const data = await getSearchHistory();
    const content = {
      datetime: new Date(),
      content: data.splice( targetIndex, 1 )[ 0 ].content,
    };
    data.unshift( content );
    await Filesystem.writeFile( {
      path: config.viteSearchHistoryFileName,
      data: JSON.stringify( data ),
      directory: Directory.Data,
      encoding: Encoding.UTF8,
    } );
    return true;
  } catch ( error ) {
    console.error( "error sorting to file:", error );
    return false;
  }
}

// 插入历史记录
export async function unshiftSearchHistory (
  targetHistory: SearchHistory,
): Promise<boolean> {
  try {
    const data = await getSearchHistory();
    data.unshift( targetHistory );
    await Filesystem.writeFile( {
      path: config.viteSearchHistoryFileName,
      data: JSON.stringify( data.slice( 0, config.viteMaxHistoryRecords ) ),
      directory: Directory.Data,
      encoding: Encoding.UTF8,
    } );
    return true;
  } catch ( error ) {
    console.error( "error left appending to file:", error );
    return false;
  }
}

// 删除历史记录
export async function deleteSearchHistory (
  targetIndex: number,
): Promise<boolean> {
  try {
    const data = await getSearchHistory();
    data.splice( targetIndex, 1 );
    await Filesystem.writeFile( {
      path: config.viteSearchHistoryFileName,
      data: JSON.stringify( data ),
      directory: Directory.Data,
      encoding: Encoding.UTF8,
    } );
    return true;
  } catch ( error ) {
    console.error( "error deleting to file:", error );
    return false;
  }
}

// 清空历史记录
export async function clearSearchHistory (): Promise<boolean> {
  try {
    await Filesystem.writeFile( {
      path: config.viteSearchHistoryFileName,
      data: JSON.stringify( [] ),
      directory: Directory.Data,
      encoding: Encoding.UTF8,
    } );
    return true;
  } catch ( error ) {
    console.error( "error clearing to file:", error );
    return false;
  }
}
