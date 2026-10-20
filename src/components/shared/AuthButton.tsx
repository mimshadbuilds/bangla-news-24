'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Avatar } from '@heroui/react';

import { authClient } from '@/lib/auth-client';

const AuthButtons = () => {
    const router = useRouter();

    const { data: session, isPending, error } = authClient.useSession();
    const user = session?.user;

    if (isPending) {
        return null;
    }

    if (error) {
        return (
            <Link href="/sign-in"
                className="rounded-full bg-red-800 px-2.5 py-1 text-xs font-semibold text-white hover:bg-red-500 sm:px-3 sm:py-2 sm:text-sm">
                সাইন ইন
            </Link>
        );
    }

    const handleSignOut = async () => {
        await authClient.signOut();
        router.push('/sign-in');
    };

    if (!user) {
        return (
            <>
                <Link href="/sign-in">
                    <button className="rounded-full px-2 py-1 text-xs font-semibold text-neutral-700 transition-colors hover:text-red-700 dark:text-neutral-300 dark:hover:text-red-400 sm:px-3 sm:py-2 sm:text-sm">
                        সাইন ইন
                    </button>
                </Link>

                <Link href="/sign-up">
                    <button className="rounded-full bg-red-700 px-2.5 py-1 text-xs font-semibold text-white transition-colors hover:bg-red-800 sm:px-3 sm:py-2 sm:text-sm">
                        সাইন আপ
                    </button>
                </Link>
            </>
        );
    }

    return (
        <div className="flex items-center gap-1.5 sm:gap-3">
            <Link href='/profile'>
                <Avatar size="sm">
                    <Avatar.Image
                        alt={user.name ?? 'User'}
                        src={user.image ?? undefined}
                    />
                    <Avatar.Fallback>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-5">
                            <path
                                fillRule="evenodd"
                                d="M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10ZM4.5 21a7.5 7.5 0 0 1 15 0H4.5Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </Avatar.Fallback>
                </Avatar>
            </Link>

            <p className="hidden text-xs sm:block">
                Welcome,
                <span className="text-base font-medium text-red-600">
                    {' '}
                    {user?.name}
                </span>
            </p>

            <button
                onClick={handleSignOut}
                className="rounded-full bg-red-700 px-2.5 py-1 text-xs font-semibold text-white transition-colors hover:bg-red-800 sm:px-3 sm:py-2 sm:text-sm">
                সাইন আউট
            </button>
        </div>
    );
};

export default AuthButtons;
