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
            <Link
                href="/sign-in"
                className="rounded-3xl border border-slate-50 bg-red-800 px-3 py-2 text-white hover:bg-red-500 hover:text-neutral-100"
            >
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
                    <button className="btn btn-outline border-none">
                        সাইন ইন
                    </button>
                </Link>

                <Link href="/sign-up">
                    <button className="btn bg-red-700 text-white">
                        সাইন আপ
                    </button>
                </Link>
            </>
        );
    }

    return (
        <div className="mt-2 flex items-center gap-3">
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

            <p className="text-xs">
                Welcome,
                <span className="text-base font-medium text-red-600">
                    {' '}
                    {user.name}
                </span>
            </p>

            <button
                onClick={handleSignOut}
                className="btn bg-red-700 text-white">
                সাইন আউট
            </button>
        </div>
    );
};

export default AuthButtons;