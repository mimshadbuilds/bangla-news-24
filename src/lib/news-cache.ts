import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

interface CacheEntry<T> {
    savedAt: number;
    data: T;
}

const CACHE_DIR = path.join(process.cwd(), ".cache", "news-api");
// Kept in module scope so repeated requests during an outage avoid disk reads.
const memoryCache = new Map<string, CacheEntry<unknown>>();

const getCacheFile = (key: string) =>
    path.join(
        CACHE_DIR,
        `${createHash("sha1").update(key).digest("hex")}.json`
    );

async function readFromDisk<T>(key: string): Promise<CacheEntry<T> | null> {
    try {
        const raw = await readFile(getCacheFile(key), "utf8");
        const entry = JSON.parse(raw) as CacheEntry<T>;

        if (typeof entry?.savedAt !== "number" || !("data" in entry)) {
            return null;
        }

        memoryCache.set(key, entry);
        return entry;
    } catch {
        return null;
    }
}

/**
 * Returns a previously cached response, but only while it is younger than
 * `maxAgeMs`. Cache hits are never used instead of a fresh request — only as
 * a fallback when the news API is unavailable.
 */
export async function readCachedResponse<T>(
    key: string,
    maxAgeMs: number
): Promise<T | null> {
    const entry =
        (memoryCache.get(key) as CacheEntry<T> | undefined) ??
        (await readFromDisk<T>(key));

    if (!entry) {
        return null;
    }

    if (Date.now() - entry.savedAt > maxAgeMs) {
        return null;
    }

    return entry.data;
}

/**
 * Best-effort persistence. A read-only or unavailable filesystem must never
 * break a successful request, so write failures are swallowed.
 */
export async function writeCachedResponse<T>(
    key: string,
    data: T
): Promise<void> {
    const entry: CacheEntry<T> = { savedAt: Date.now(), data };
    memoryCache.set(key, entry);

    try {
        await mkdir(CACHE_DIR, { recursive: true });
        await writeFile(getCacheFile(key), JSON.stringify(entry), "utf8");
    } catch {
        // Ignore cache write failures.
    }
}
