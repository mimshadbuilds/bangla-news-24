import { getNews } from "@/lib/news";
import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"
import Link from 'next/link'

const Marquee = async () => {
    const data = await getNews(10);
    const headlines = data.data;

    if (!Array.isArray(headlines)) {
        throw new Error("News API returned an invalid headlines list.");
    }

    return (
        <div className='overflow-hidden sticky top-0 z-50 bg-red-700 text-white'>    
            <div className='flex items-stretch max-w-7xl mx-auto'>
                <span className='z-10 flex shrink-0 items-center gap-1 bg-red-800 px-4 py-2 text-sm font-bold'>সর্বশেষ</span>
                <div className='group flex flex-1 overflow-hidden py-2'>
                    <div className='flex shrink-0 whitespace-nowrap px-4 text-sm group-hover:[animation-play-state:paused]'>
                        <MarqueeText direction='right' duration={80} pauseOnHover={true}>
                            {headlines.map((latest) =>
                            <Link href={`/news/${latest.id}`} key={latest.id}>
                            <span>
                                <span className='inline-flex items-center hover:underline'>{latest.title} 
                                    <span className="mx-4 text-white/50">•</span>
                                </span>
                            </span>
                            </Link>
                                )}
                        </MarqueeText>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Marquee;