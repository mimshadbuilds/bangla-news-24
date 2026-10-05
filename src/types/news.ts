export interface ICategory {
    slug: string;
    title: string;
    topicId: string | null;
    url: string;
    scrapable: boolean;
}

export interface INewsItem {
    id: string;
    title: string;
    description: string | null;
    link: string;
    imageUrl: string | null;
    imageAlt: string | null;
    category: string;
    type: "article" | "commentary" | "link";
    isLive: boolean;
    firstPublished: string | null;
    lastPublished: string | null;
    source: string;
}

export interface IMostReadItem extends INewsItem {
    rank: number;
}

export interface INewsResponse {
    success: boolean;
    count: number;
    total: number;
    limit: number;
    offset: number;
    cachedAt: string;
    data: INewsItem[];
}

export interface ICategoriesResponse {
    success: boolean;
    count: number;
    cachedAt: string;
    data: ICategory[];
}

export interface IMostReadResponse {
    success: boolean;
    count: number;
    cachedAt: string;
    generated: string;
    data: IMostReadItem[];
}

export interface INewsSection {
    title: string;
    curationId: string;
    curationType: "tipo-curation" | "vivo-stream";
    link: string | null;
    count: number;
    articles: INewsItem[];
}

export interface INewsSectionsResponse {
    success: boolean;
    count: number;
    cachedAt: string;
    data: INewsSection[];
}

export interface ICategoryResponse {
    success: boolean;
    count: number;
    total: number;
    page: number;
    limit: number;
    cachedAt: string;
    title: string;
    data: INewsItem[];
}

export interface IArticleBodyText {
    type: "text";
    text: string;
}

export interface IArticleBodySubheading {
    type: "subheading";
    text: string;
}

export interface IArticleBodyImage {
    type: "image";
    url: string;
    width: number;
    height: number;
    caption: string | null;
    credit?: string | null;
    alt?: string | null;
}

export type IArticleBodyBlock =
    | IArticleBodyText
    | IArticleBodySubheading
    | IArticleBodyImage;

export interface IArticleDescriptionFragment {
    type: "fragment";
    model: {
        text: string;
        attributes: unknown[];
    };
}

export interface IArticleDescriptionParagraph {
    type: "paragraph";
    model: {
        text: string;
        blocks: IArticleDescriptionFragment[];
    };
}

export interface IArticleDescriptionText {
    type: "text";
    model: {
        blocks: IArticleDescriptionParagraph[];
    };
}

export interface IArticleDescription {
    blocks: IArticleDescriptionText[];
}

export interface IArticle
    extends Omit<INewsItem, "description"> {
    byline: string[];
    description: IArticleDescription | null;
    topics: string[];
    tags: string[];
    wordCount: number;
    body: IArticleBodyBlock[];
    text: string;
}

export interface IArticleResponse {
    success: boolean;
    data: IArticle;
}

export interface IApiError {
    success: false;
    error: {
        code: string;
        message: string;
    };
}