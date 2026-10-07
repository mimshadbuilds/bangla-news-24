import Link from 'next/link'

const NotFound = () => {
    return (
        <main className="flex min-h-[60vh] items-center justify-center px-4 mt-10">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-red-700">Category not found!</h1>
                <p className="mt-3 text-neutral-700 font-semibold">
                    This category is unavailable or no longer exists.
                </p>
                <Link href="/" ><button className='btn bg-red-700 mt-4 text-white'> GO BACK</button></Link>
            </div>
        </main>
    );
};

export default NotFound;