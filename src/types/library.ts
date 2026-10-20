import { INewsItem } from "./news";

export interface ISavedNews extends INewsItem {
    savedAt: string;
}

export interface IHistoryNews extends INewsItem {
    viewedAt: string;
}
