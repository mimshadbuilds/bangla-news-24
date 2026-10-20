import { readCachedResponse, writeCachedResponse } from "@/lib/news-cache";
import {
    IArticleResponse,
    ICategoriesResponse,
    ICategoryResponse,
    INewsResponse,
    INewsSectionsResponse,
    IMostReadResponse,
} from "@/types/news";

const BASE_URL = "https://news-api-v2.vercel.app";
const REQUEST_TIMEOUT_MS = 8_000;
const NEWS_CACHE_MAX_AGE_MS = 24 * 60 * 60 * 1000;
const CATEGORIES_CACHE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

const warnedCacheKeys = new Set<string>();

export class NewsApiError extends Error {
    readonly status?: number;

    constructor(message: string, status?: number) {
        super(message);
        this.name = "NewsApiError";
        this.status = status;
    }
}

async function fetchFromApi<T>(
    cacheKey: string,
    pathAndQuery: string,
    maxStaleAgeMs: number
): Promise<T> {
    try {
        const res = await fetch(`${BASE_URL}${pathAndQuery}`, {
            cache: "no-store",
            signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
        });

        if (!res.ok) {
            throw new NewsApiError(
                `Failed to fetch ${pathAndQuery} (${res.status})`,
                res.status
            );
        }

        const data = (await res.json()) as T;
        await writeCachedResponse(cacheKey, data);

        return data;
    } catch (error) {
        // Missing content should remain a real 404 instead of silently
        // serving an old copy.
        if (error instanceof NewsApiError && error.status === 404) {
            throw error;
        }

        const cached = await readCachedResponse<T>(cacheKey, maxStaleAgeMs);

        if (cached) {
            if (!warnedCacheKeys.has(cacheKey)) {
                warnedCacheKeys.add(cacheKey);
                console.warn(
                    `[news] News API request failed for "${cacheKey}"; serving the last cached response.`
                );
            }

            return cached;
        }

        if (error instanceof NewsApiError) {
            throw error;
        }

        throw new NewsApiError(
            `Failed to fetch ${pathAndQuery}: ${
                error instanceof Error ? error.message : "Unknown error"
            }`
        );
    }
}

export async function getCategories(): Promise<ICategoriesResponse> {
    return fetchFromApi<ICategoriesResponse>(
        "categories",
        "/api/categories",
        CATEGORIES_CACHE_MAX_AGE_MS
    );
}

export async function getNews(
    limit = 50,
    offset = 0,
    category?: string,
    query?: string
): Promise<INewsResponse> {
    const params = new URLSearchParams({
        limit: String(limit),
        offset: String(offset),
    });

    if (category) {
        params.set("category", category);
    }

    if (query) {
        params.set("q", query);
    }

    return fetchFromApi<INewsResponse>(
        `news:${limit}:${offset}:${category ?? ""}:${query ?? ""}`,
        `/api/news?${params.toString()}`,
        NEWS_CACHE_MAX_AGE_MS
    );
}

export async function getNewsSections(): Promise<INewsSectionsResponse> {
    return fetchFromApi<INewsSectionsResponse>(
        "news-sections",
        "/api/news/sections",
        NEWS_CACHE_MAX_AGE_MS
    );
}

export async function getMostRead(): Promise<IMostReadResponse> {
    return fetchFromApi<IMostReadResponse>(
        "most-read",
        "/api/news/most-read",
        NEWS_CACHE_MAX_AGE_MS
    );
}

export async function getCategory(
    category: string,
    limit = 50,
    page = 1
): Promise<ICategoryResponse> {
    const params = new URLSearchParams({
        limit: String(limit),
        page: String(page),
    });

    return fetchFromApi<ICategoryResponse>(
        `category:${category}:${limit}:${page}`,
        `/api/category/${encodeURIComponent(category)}?${params.toString()}`,
        NEWS_CACHE_MAX_AGE_MS
    );
}

export async function getArticle(id: string): Promise<IArticleResponse> {
    return fetchFromApi<IArticleResponse>(
        `article:${id}`,
        `/api/article/${encodeURIComponent(id)}`,
        NEWS_CACHE_MAX_AGE_MS
    );
}
