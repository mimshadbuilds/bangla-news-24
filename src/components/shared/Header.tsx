import Image from 'next/image';
import NavLinks from './NavLinks';

const Header = () => {
    const date = new Date().toLocaleDateString('bn-BD', {
        dateStyle: 'full',
    });
    return (
    <section className='border-b border-neutral-200 bg-white'>    
            <header className='relative max-w-7xl mx-auto px-4 py-4'>
                <div className='flex flex-col justify-center items-center gap-1 sm:flex-row sm:gap-2'>
                    <Image className='w-10 h-10' height={50} width={50} alt='logo' src={'/logo.webp'} />
                    <div>
                        <h1 className='text-2xl font-bold'>Bangla News 24</h1>
                        <p>{date}</p>
                    </div>
                </div>
                <div className='absolute right-4 flex gap-3 text-sm top-4'>
                    <button className='btn btn-outline border-none'>সাইন ইন</button>
                    <button className='btn bg-red-700 text-white'>সাইন আপ</button>
                </div>
                <NavLinks />
            </header>
    </section>
    );
};

export default Header;