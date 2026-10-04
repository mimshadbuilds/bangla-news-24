import { INewsItem, INewsResponse } from '@/types/news';
import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"

const Marquee = async () => {
    const res = await fetch("https://news-api-v2.vercel.app/api/news?limit=10")
    const data: INewsResponse = await res.json();
    const headlines = data.data;
    // console.log(headlines)
    return (
        <div className='overflow-hidden sticky top-0 z-50 bg-red-700 text-white'>    
            <div className='flex items-stretch max-w-7xl mx-auto'>
                <span className='z-10 flex shrink-0 items-center gap-1 bg-red-800 px-4 py-2 text-sm font-bold'>সর্বশেষ</span>
                <div className='group flex flex-1 overflow-hidden py-2'>
                    <div className='flex shrink-0 whitespace-nowrap px-4 text-sm group-hover:[animation-play-state:paused]'>
                        <MarqueeText direction='right' duration={80}>
                        {headlines.map((latest: INewsItem) => <span key={latest.id}>
                    <span className='inline-flex items-center'>{latest.title} 
                        <span className="mx-4 text-white/50">•</span></span>
                    </span>)}
                        </MarqueeText>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Marquee;