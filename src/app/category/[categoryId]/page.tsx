
const CategoryNews = async ({ params }) => {
    const {categoryId} = await params;
    const res = await fetch(`https://news-api-v2.vercel.app/api/category/${categoryId}`);
    const data = await res.json();
    const news = data.data;
    console.log(news)
    return (
        <div>
            {news.length}
        </div>
    );
};

export default CategoryNews;