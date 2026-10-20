import { MongoClient } from "mongodb";
import { INewsItem } from "@/types/news";

export type SavedNewsRecord = INewsItem & {
    userId: string;
    savedAt: Date;
};

export type HistoryNewsRecord = INewsItem & {
    userId: string;
    viewedAt: Date;
};

const uri = process.env.MONGODB_URL;

if (!uri) {
    throw new Error("MONGODB_URL is not set");
}

const globalForMongo = globalThis as typeof globalThis & {
    mongoClient?: MongoClient;
};

export const mongoClient = globalForMongo.mongoClient ?? new MongoClient(uri);

if (process.env.NODE_ENV !== "production") {
    globalForMongo.mongoClient = mongoClient;
}

export const database = mongoClient.db("news24-auth-db");

export const bookmarksCollection = database.collection<SavedNewsRecord>("bookmarks");
export const historyCollection = database.collection<HistoryNewsRecord>("history");

let indexesReady: Promise<void> | null = null;

export function ensureLibraryIndexes(): Promise<void> {
    indexesReady ??= Promise.all([
        bookmarksCollection.createIndex({ userId: 1, id: 1 }, { unique: true }),
        bookmarksCollection.createIndex({ userId: 1, savedAt: -1 }),
        historyCollection.createIndex({ userId: 1, id: 1 }, { unique: true }),
        historyCollection.createIndex({ userId: 1, viewedAt: -1 }),
    ]).then(() => undefined);

    return indexesReady;
}
