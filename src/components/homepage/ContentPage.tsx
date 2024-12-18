"use client";
import { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import Cta from "../common/Cta";
import Icons from "../icons/Icons";
import { useCart } from "../CartProvider";

interface ContentList {
  image: string | StaticImageData;
  tittle: string;
  description: string;
  source: string;
}

interface ContentPageProps extends ContentList {
  totalItems: number;
  maxItems: number;
  disableIncrement: boolean;
}

const ContentPage = ({
  image,
  tittle,
  description,
  source,
  totalItems,
  maxItems,
  disableIncrement,
}: ContentPageProps) => {
  const [count, setCount] = useState<number>(0);
  const { addToCart, updateCartItem } = useCart();

  useEffect(() => {
    // Load cart data from localStorage when component mounts
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const item = storedCart.find(
      (item: { tittle: string }) => item.tittle === tittle
    );
    if (item) {
      setCount(item.count); // Set the count if the item exists in cart
    }
  }, [tittle]);

  const updateLocalStorage = (updatedCount: number) => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = storedCart.filter(
      (item: { tittle: string }) => item.tittle !== tittle
    );
    if (updatedCount > 0) {
      updatedCart.push({ tittle, description, count: updatedCount, source });
    }
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increment = () => {
    if (!disableIncrement && count < maxItems && totalItems < 6) {
      const newCount = count + 1;
      setCount(newCount);
      if (newCount === 1) {
        addToCart({ tittle, description, count: 1, source });
      } else {
        updateCartItem(tittle, newCount);
      }
      updateLocalStorage(newCount);
    }
  };

  const decrement = () => {
    if (count > 0) {
      const newCount = count - 1;
      setCount(newCount);
      updateCartItem(tittle, newCount);
      updateLocalStorage(newCount);
    }
  };

  return (
    <div className="border border-black/50 border-solid p-3 rounded-lg max-w-[355px] xl:max-w-[262px]">
      <div className="w-full">
        <Image
          width={500}
          height={500}
          className="w-full h-full object-cover"
          src={image}
          alt={tittle}
        />
      </div>
      <div className="flex items-center justify-between pt-4">
        <div>
          <h2 className="text-base md:text-xl font-medium">{tittle}</h2>
          <p className="text-sm md:text-base text-gray-600 pt-1">
            {description}
          </p>
        </div>
        {count === 0 ? (
          <Cta
            className={`!p-1 group ${
              totalItems >= 6 || disableIncrement || count >= maxItems
                ? "opacity-50 pointer-events-none"
                : ""
            }`}
            onClick={increment}
          >
            <div className="w-6 h-6 cursor-pointer">
              <Icons
                className="w-6 h-6"
                icon="cart"
                pathClass="group-hover:fill-black fill-white common-transition"
              />
            </div>
          </Cta>
        ) : (
          <div className="flex items-center">
            <Cta
              onClick={decrement}
              className="bg-red-500 border-red-500 !p-1 rounded-full hover:bg-white group w-7 h-7 flex items-center justify-center"
            >
              <Icons
                icon="minus"
                className="w-6 h-6"
                pathClass="group-hover:fill-red-500 common-transition"
              />
            </Cta>
            <span className="text-base text-center font-medium w-5">
              {count}
            </span>
            <Cta
              disabled={
                disableIncrement || count >= maxItems || totalItems >= maxItems
              }
              onClick={increment}
              className={`bg-green-500 border-green-500 !p-1 rounded-full hover:bg-white w-7 h-7 group flex items-center justify-center ${
                disableIncrement || count >= maxItems || totalItems >= maxItems
                  ? "opacity-50 pointer-events-none"
                  : ""
              }`}
            >
              <Icons
                icon="plus"
                className="w-6 h-6"
                pathClass="group-hover:fill-green-500 common-transition"
              />
            </Cta>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentPage;
