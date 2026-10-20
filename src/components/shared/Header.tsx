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
            <header className='relative max-w-7xl mx-auto px-4 py-4'>
                <div className='flex flex-col justify-center items-center gap-1 sm:flex-row sm:gap-2'>
                    <Image className='w-10 h-10' height={50} width={50} alt='logo' src={'/logo.webp'} />
                    <div>
                        <h1 className='text-2xl font-bold'>Bangla News 24</h1>
                        <p>{date}</p>
                    </div>
                </div>
                <div className='absolute right-4 flex items-center gap-3 text-sm top-4'>
                    <ThemeToggle />
                    <AuthButtons />
                </div>
                <div className='mx-auto mt-3 w-full max-w-md'>
                    <SearchBar />
                </div>
                <Suspense fallback={<div className='mt-5 h-5' aria-hidden='true' />}>
                    <NavLinks />
                </Suspense>
            </header>
    </section>
    );
};

export default Header;
