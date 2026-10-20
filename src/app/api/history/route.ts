import { NextResponse } from "next/server";
import { ensureLibraryIndexes, historyCollection } from "@/lib/db";
import { toNewsItem } from "@/lib/library";
import { getCurrentUserId } from "@/lib/session";

const HISTORY_LIMIT = 50;

export async function GET() {
    const userId = await getCurrentUserId();

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await ensureLibraryIndexes();

    const data = await historyCollection
        .find(
            { userId },
            { projection: { _id: 0, userId: 0 } }
        )
        .sort({ viewedAt: -1 })
        .limit(HISTORY_LIMIT)
        .toArray();

    return NextResponse.json({ data });
}

export async function POST(request: Request) {
    const userId = await getCurrentUserId();

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => null);
    const news = toNewsItem(
        body && typeof body === "object" && "news" in body
            ? (body as { news: unknown }).news
            : body
    );

    if (!news) {
        return NextResponse.json({ error: "Invalid news item" }, { status: 400 });
    }

    await ensureLibraryIndexes();

    await historyCollection.updateOne(
        { userId, id: news.id },
        { $set: { ...news, userId, viewedAt: new Date() } },
        { upsert: true }
    );

    return NextResponse.json({ tracked: true });
}

export async function DELETE() {
    const userId = await getCurrentUserId();

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await ensureLibraryIndexes();

    await historyCollection.deleteMany({ userId });

    return NextResponse.json({ cleared: true });
}
