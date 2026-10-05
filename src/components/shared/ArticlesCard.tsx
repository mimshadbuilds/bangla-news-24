import Image from "next/image";
import { IArticleBodyBlock } from "@/types/news";

export const ArticleBody = ({ body }: { body: IArticleBodyBlock[];
}) => {
    
    return (
        <div className="text-[16px] leading-[1.8] text-neutral-900 sm:text-[17px]">
            {body.map((block, index) => {
                if (block.type === "text") {
                    return (
                        <p key={index}
                            className="mb-5">
                            {block.text}
                        </p>
                    );
                }
                if (block.type === "subheading") {
                    return (
                        <h2
                            key={index}
                            className="mb-4 mt-8 text-[22px] font-bold leading-[1.45] text-neutral-900">
                            {block.text}
                        </h2>
                    );
                }
                if (block.type === "image") {
                    return (
                        <figure
                            key={index}
                            className="my-7">
                            <Image
                                src={block.url}
                                alt={block.alt ?? block.caption ?? ""}
                                width={block.width}
                                height={block.height}
                                className="h-auto w-full rounded-md object-cover"
                            />
                            {(block.caption || block.credit) && (
                                <figcaption className="mt-2 text-[12px] leading-[1.6] text-neutral-500">
                                    {block.caption}
                                    {block.credit && (
                                        <span className="ml-1">
                                            — {block.credit}
                                        </span>
                                    )}
                                </figcaption>
                            )}
                        </figure>
                    );
                }
            return null;
            })}
        </div>
    );
};