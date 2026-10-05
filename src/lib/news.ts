import {
    IArticleResponse,
    ICategoriesResponse,
    ICategoryResponse,
    INewsResponse,
    INewsSectionsResponse,
    IMostReadResponse,
} from "@/types/news";

const BASE_URL = "https://news-api-v2.vercel.app";

export async function getCategories(): Promise<ICategoriesResponse> {
    const res = await fetch(`${BASE_URL}/api/categories`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch categories (${res.status})`);
    }

    return res.json();
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

    const res = await fetch(`${BASE_URL}/api/news?${params.toString()}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch news (${res.status})`);
    }

    return res.json();
}

export async function getNewsSections(): Promise<INewsSectionsResponse> {
    const res = await fetch(`${BASE_URL}/api/news/sections`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch news sections (${res.status})`);
    }

    return res.json();
}

export async function getMostRead(): Promise<IMostReadResponse> {
    const res = await fetch(`${BASE_URL}/api/news/most-read`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch most read news (${res.status})`);
    }

    return res.json();
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

    const res = await fetch(
        `${BASE_URL}/api/category/${encodeURIComponent(category)}?${params.toString()}`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        throw new Error(`Failed to fetch category (${res.status})`);
    }

    return res.json();
}

export async function getArticle(id: string): Promise<IArticleResponse> {
    const res = await fetch(`${BASE_URL}/api/article/${id}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch article (${res.status})`);
    }

    return res.json();
}