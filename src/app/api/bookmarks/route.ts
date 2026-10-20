import { NextResponse } from "next/server";
import { bookmarksCollection, ensureLibraryIndexes } from "@/lib/db";
import { toNewsItem } from "@/lib/library";
import { getCurrentUserId } from "@/lib/session";

export async function GET() {
    const userId = await getCurrentUserId();

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await ensureLibraryIndexes();

    const data = await bookmarksCollection
        .find(
            { userId },
            { projection: { _id: 0, userId: 0 } }
        )
        .sort({ savedAt: -1 })
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

    await bookmarksCollection.updateOne(
        { userId, id: news.id },
        { $set: { ...news, userId, savedAt: new Date() } },
        { upsert: true }
    );

    return NextResponse.json({ saved: true });
}

export async function DELETE(request: Request) {
    const userId = await getCurrentUserId();

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = new URL(request.url).searchParams.get("id");

    if (!id) {
        return NextResponse.json({ error: "Missing news id" }, { status: 400 });
    }

    await ensureLibraryIndexes();

    await bookmarksCollection.deleteOne({ userId, id });

    return NextResponse.json({ saved: false });
}
