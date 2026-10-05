import MainNews from "@/components/homepage/MainNews";
import Marquee from "@/components/homepage/Marquee";
import MostRead from "@/components/homepage/MostRead";
import SelectedNewsCard from "@/components/homepage/SelectedNewsCard";
import { getNewsSections } from "@/lib/news";
import { INewsSection } from "@/types/news";

export default async function Home() {
  const data = await getNewsSections()
  const mainSection = data.data[0];
  const otherSections: INewsSection[] = data.data.slice(1)

  return (
    <div>
      <Marquee />
      <div className="grid grid-cols-3 max-w-7xl mx-auto gap-4 mt-5">
        <div className="col-span-2">
          {mainSection && 
            <MainNews news={mainSection} />
          }

          <div className="grid gap-5 mb-5 py-4">
            {otherSections.map(section => 
              <div key={section.curationId}>
                <h1 className="text-lg text-neutral-900 font-bold">{section.title}</h1>
                <div className="border-b-2 border-red-700 pb-2"></div>
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {section.articles.map(item => 
                    <SelectedNewsCard key={item.id} news={item} />
                  )}
                </div>
              </div> 
            )}
          </div>
        </div>
        <div className="col-span-1">
          <MostRead />
        </div>
      </div>
    </div>
  );
}
