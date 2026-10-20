import Image from 'next/image';
import { Suspense } from 'react';
import NavLinks from './NavLinks';
import AuthButtons from './AuthButton';
import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';

const Header = () => {
    
    const date = new Date().toLocaleDateString('bn-BD', {
        dateStyle: 'full',
    });

    return (
    <section className='border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950'>    
            <header className='mx-auto w-full max-w-7xl px-4 py-3 sm:py-4'>
                <div className='flex flex-wrap items-center gap-x-2 gap-y-1.5'>
                    <div className='flex min-w-[180px] flex-1 items-center gap-2'>
                        <Image
                            className='h-9 w-9 shrink-0 sm:h-10 sm:w-10'
                            height={50}
                            width={50}
                            alt='logo'
                            src={'/logo.webp'}
                        />
                        <div className='min-w-0'>
                            <h1 className='truncate text-base font-bold sm:text-2xl'>Bangla News 24</h1>
                            <p className='hidden truncate text-xs text-neutral-500 dark:text-neutral-400 sm:block sm:text-sm'>{date}</p>
                        </div>
                    </div>
                    <div className='ml-auto flex shrink-0 items-center gap-1.5 text-sm sm:gap-3'>
                        <ThemeToggle />
                        <AuthButtons />
                    </div>
                </div>
                <div className='mx-auto mt-3 w-full sm:max-w-md'>
                    <SearchBar />
                </div>
                <Suspense fallback={<div className='mt-3 h-6 sm:mt-5' aria-hidden='true' />}>
                    <NavLinks />
                </Suspense>
            </header>
    </section>
    );
};

export default Header;
