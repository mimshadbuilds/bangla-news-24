const NotFound = () => {
    return (
        <main className="flex min-h-[60vh] items-center justify-center px-4 mt-10">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-red-700">Article not found!</h1>
                <p className="mt-3 text-neutral-700 font-semibold">
                    This article is unavailable or no longer exists.
                </p>
            </div>
        </main>
    );
};

export default NotFound;