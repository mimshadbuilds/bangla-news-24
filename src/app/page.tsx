import { Suspense } from "react";
import MainNews from "@/components/homepage/MainNews";
import MostRead from "@/components/homepage/MostRead";
import NewsUnavailable from "@/components/shared/NewsUnavailable";
import SelectedNewsCard from "@/components/shared/SelectedNewsCard";
import { getNewsSections } from "@/lib/news";
import { INewsSection } from "@/types/news";

export default async function Home() {
  let sections: INewsSection[] = [];
  let failed = false;

  try {
    const data = await getNewsSections();
    sections = Array.isArray(data.data) ? data.data : [];
  } catch {
    failed = true;
  }

  if (failed) {
    return <NewsUnavailable />;
  }

  const mainSection = sections[0];
  const otherSections: INewsSection[] = sections.slice(1)

  if (!mainSection) {
    return (
      <NewsUnavailable
        title="এই মুহূর্তে কোনো সংবাদ নেই"
        description="নতুন সংবাদ প্রকাশের সঙ্গে সঙ্গে এখানে দেখা যাবে।"
      />
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 max-w-7xl mx-auto gap-4 mt-5 px-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {mainSection && 
            <MainNews news={mainSection} />
          }

          <div className="grid gap-5 mb-5 py-4">
            {otherSections.map(section => 
              <div key={section.curationId}>
                <h1 className="text-lg text-neutral-900 font-bold dark:text-neutral-100">{section.title}</h1>
                <div className="border-b-2 border-red-700 pb-2"></div>
                <div className="grid grid-cols-2 gap-2 mt-3 sm:grid-cols-3">
                  {section.articles.map(item => 
                    <SelectedNewsCard key={item.id} news={item} />
                  )}
                </div>
              </div> 
            )}
          </div>
        </div>
        <div className="lg:col-span-1">
          <Suspense fallback={<div className="h-64 animate-pulse rounded-xl bg-neutral-200 dark:bg-neutral-800" />}>
            <MostRead />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
