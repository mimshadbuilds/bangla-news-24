import Image from 'next/image';
import { Suspense } from 'react';
import NavLinks from './NavLinks';
import AuthButtons from './AuthButton';
import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';
import Link from 'next/link';

const Header = () => {
    
    const date = new Date().toLocaleDateString('bn-BD', {
        dateStyle: 'full',
    });

    return (
    <section className='bg-white dark:bg-neutral-950'>
            <header className='mx-auto w-full max-w-7xl px-4 py-3 sm:py-4'>
                <div className='flex flex-wrap items-center gap-x-2 gap-y-1.5'>
                    <Link href='/'>
                    <div className='flex min-w-[180px] flex-1 items-center gap-2'>
                        <Image
                            className='h-10 w-10 shrink-0 sm:h-10 sm:w-10'
                            height={44}
                            width={44}
                            alt='logo'
                            src={'/news-24.png'}
                        />
                        <div className='min-w-0'>
                            <h1 className='truncate text-base font-bold sm:text-2xl'>News 24</h1>
                            <p className='hidden truncate text-xs text-neutral-500 dark:text-neutral-400 sm:block sm:text-sm'>{date}</p>
                        </div>
                    </div>
                    </Link>
                    <div className='ml-auto flex shrink-0 items-center gap-1.5 text-sm sm:gap-3'>
                        <AuthButtons />
                        <ThemeToggle />
                    </div>
                </div>
                <div className='mx-auto mt-3 w-full sm:max-w-md'>
                    <SearchBar />
                </div>
            </header>
            <div className='w-full border-b border-neutral-50 bg-white dark:border-neutral-800/50 dark:bg-neutral-950'>
                <div className='mx-auto w-full max-w-7xl px-4 mb-2'>
                    <Suspense fallback={<div className='mt-3 h-6 sm:mt-5' aria-hidden='true' />}>
                    <NavLinks />
                    </Suspense>
                </div>
            </div>
    </section>
    );
};

export default Header;
