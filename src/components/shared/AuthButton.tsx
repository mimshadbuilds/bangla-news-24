'use client';

import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { redirect } from 'next/navigation';

const AuthButtons = () => {
    const { data: session, isPending, error } = authClient.useSession();
    // console.log('user session data', session);
    if (isPending) {
        return null;
    }

    if(error) {
        return <Link href="/sign-in" 
        className="rounded-3xl border border-slate-50 bg-red-800 px-3 py-2 text-white hover:bg-red-500 hover:text-neutral-100">সাইন ইন</Link>
    }

    const handleSignOut = async () => {
    await authClient.signOut(); 
    redirect('/sign-in')
    }

    if (!session?.user) {
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
        <div className='flex items-center gap-3 mt-2'>
            <p className='text-xs'>Welcome,<span className="text-red-600 text-base font-medium"> {session?.user.name}</span></p>
            <button onClick={handleSignOut} className="btn bg-red-700 text-white">
                সাইন আউট
            </button>
        </div>
    );
};

export default AuthButtons;