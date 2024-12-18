"use client";
import Link from "next/link";
import Icons from "../icons/Icons";
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="mt-10 bg-black/10">
      <div className="max-w-[1172px] container ">
        <div className="flex items-center gap-4 justify-center py-6 md:py-8 lg:py-10">
        <Link href="/homepage">
            <Icons icon="logo" className="w-14 h-14" />
          </Link>
          <h2 className="font-semibold text-2xl md:text-3xl">Data Ground</h2>
        </div>
      </div>
      <div className="w-full bg-black h-[1px] bg-opacity-15"></div>
      <div className="py-5">
        <p className="font-normal text-sm leading-108.8 text-holly mb-0 text-center">
          Copyright © {year} Data Ground
        </p>
      </div>
    </div>
  );
};

export default Footer;
