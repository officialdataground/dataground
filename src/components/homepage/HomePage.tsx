"use client";
import { useState, useEffect } from "react";
import { CONTENT_ONE_LIST, CONTENT_TWO_LIST } from "../utils/Helper";
import ContentSection from "./ContentSection";
import { useCart } from "../CartProvider";

const HomePage = () => {
  const [visibleCounts, setVisibleCounts] = useState({
    one: 4,
    two: 4,
  });
  const { totalItems } = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures the code runs only on the client-side
  }, []);

  const contentOneTotalCount = isClient
    ? CONTENT_ONE_LIST.reduce((total, item) => {
        const itemInCart = JSON.parse(localStorage.getItem("cart") || "[]").find(
          (cartItem: { tittle: string }) => cartItem.tittle === item.tittle
        );
        return total + (itemInCart ? itemInCart.count : 0);
      }, 0)
    : 0;

  const setVisibleCount = (sectionKey: string, newCount: number) => {
    setVisibleCounts((prevCounts) => ({
      ...prevCounts,
      [sectionKey]: newCount,
    }));
  };

  return (
    <div className="container max-w-[1172px] mx-auto px-4">
      <ContentSection
        heading="Heading One"
        contentList={CONTENT_ONE_LIST}
        sectionKey="one"
        visibleCount={visibleCounts.one}
        setVisibleCount={setVisibleCount}
        maxItems={2}
        totalItems={totalItems}
        contentOneTotalCount={contentOneTotalCount} // Pass total count for CONTENT_ONE_LIST
      />
      <ContentSection
        heading="Heading Two"
        contentList={CONTENT_TWO_LIST}
        sectionKey="two"
        visibleCount={visibleCounts.two}
        setVisibleCount={setVisibleCount}
        maxItems={6}
        totalItems={totalItems}
      />
    </div>
  );
};

export default HomePage;
