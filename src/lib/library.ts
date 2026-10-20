import { INewsItem } from "@/types/news";

/**
 * Narrows an untrusted request payload down to the news fields we persist in
 * bookmarks/reading history. Extra article fields are intentionally dropped.
 */
export function toNewsItem(input: unknown): INewsItem | null {
    if (!input || typeof input !== "object") {
        return null;
    }

    const value = input as Record<string, unknown>;

    if (typeof value.id !== "string" || typeof value.title !== "string") {
        return null;
    }

    const type =
        value.type === "commentary" || value.type === "link"
            ? value.type
            : "article";

    return {
        id: value.id,
        title: value.title,
        description:
            typeof value.description === "string" ? value.description : null,
        link: typeof value.link === "string" ? value.link : "",
        imageUrl: typeof value.imageUrl === "string" ? value.imageUrl : null,
        imageAlt: typeof value.imageAlt === "string" ? value.imageAlt : null,
        category: typeof value.category === "string" ? value.category : "",
        type,
        isLive: Boolean(value.isLive),
        firstPublished:
            typeof value.firstPublished === "string"
                ? value.firstPublished
                : null,
        lastPublished:
            typeof value.lastPublished === "string" ? value.lastPublished : null,
        source: typeof value.source === "string" ? value.source : "",
    };
}
