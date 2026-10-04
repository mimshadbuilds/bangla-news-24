import MainNews from "@/components/homepage/MainNews";
import Marquee from "@/components/homepage/Marquee";
import { INewsSectionsResponse } from "@/types/news";

export default async function Home() {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/sections", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch news sections (${res.status})`);
  }

  const data: INewsSectionsResponse = await res.json();
  const mainSection = data.data[0];

  return (
    <div>
      <Marquee />

      <div className="grid grid-cols-3 max-w-7xl mx-auto gap-1 mt-5">
        <div className="col-span-2">
          {mainSection && 
            <MainNews news={mainSection} />
          }
        </div>
        <div className="col-span-1">

        </div>
      </div>
    </div>
  );
}
