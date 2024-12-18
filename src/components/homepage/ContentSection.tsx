"use client";
import Icons from "../icons/Icons";
import ContentPage from "../homepage/ContentPage";
import { StaticImageData } from "next/image";
import Cta from "../common/Cta";

interface ContentList {
  image: string | StaticImageData;
  tittle: string;
  description: string;
}

interface ContentSectionProps {
  heading: string;
  contentList: ContentList[];
  sectionKey: string;
  visibleCount: number;
  setVisibleCount: (sectionKey: string, newCount: number) => void;
  totalItems: number;
  maxItems: number;
  contentOneTotalCount?: number; // Optional prop to pass total count for CONTENT_ONE_LIST
}

const ContentSection = ({
  heading,
  contentList,
  totalItems,
  maxItems,
  sectionKey,
  visibleCount,
  setVisibleCount,
  contentOneTotalCount, // Receive total count for CONTENT_ONE_LIST
}: ContentSectionProps) => {
  const handleToggleView = () => {
    const newCount = visibleCount >= contentList.length ? 4 : visibleCount + 4;
    setVisibleCount(sectionKey, newCount);
  };

  // Check if contentOneTotalCount has reached maxItems (e.g., 2)
  const disableIncrementForAll =
    contentOneTotalCount !== undefined && contentOneTotalCount >= 2;

  return (
    <div>
      <div className="flex pt-10 items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-semibold ">{heading}</h2>
        <Cta
          className="flex items-center !px-3 group"
          onClick={handleToggleView}
        >
          {visibleCount >= contentList.length ? "Show Less" : "Sell More"}
          <Icons
            icon="arrow"
            className="w-4 h-4 ps-1 fill-white group-hover:fill-black common-transition"
          />
        </Cta>
      </div>
      <div className="flex justify-center items-center flex-wrap gap-4 md:gap-5 pt-6 cursor-pointer">
        {contentList.slice(0, visibleCount).map((obj, index) => (
          <ContentPage
            key={index}
            image={obj.image}
            tittle={obj.tittle}
            description={obj.description}
            totalItems={totalItems}
            maxItems={maxItems}
            disableIncrement={disableIncrementForAll}
            source={""}
          />
        ))}
      </div>
    </div>
  );
};

export default ContentSection;
