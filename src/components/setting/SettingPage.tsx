"use client";
import { useState } from "react";
import { SETTING_TAB_LIST } from "../utils/Helper";
import Cta from "../common/Cta";
import ProfileDetails from "./ProfileDetail";
import ChangePassword from "./ChangePassword";
interface NavTabsList {
  title: string;
  id: string;
}

const NavTabs = () => {
  const [activeTab, setActiveTab] = useState<string>("tab1");

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className="container max-w-[1172px] px-4">
      <div className="flex flex-col gap-6 pt-6 md:pt-8 lg:pt-10">
        <div className="flex gap-4 justify-center">
          {SETTING_TAB_LIST.map((tab: NavTabsList, index: number) => {
            return (
              <Cta
                key={index}
                onClick={() => handleTabClick(tab.id)}
                className={`flex ${activeTab === tab.id ? "" : ""}`}
              >
                <h2 className="text-center text-[13px] sm:text-base">
                  {tab.title}
                </h2>
              </Cta>
            );
          })}
        </div>
        {activeTab === "tab1" && (
          <div className="">
            <ProfileDetails />
          </div>
        )}
        {activeTab === "tab2" && (
          <div className="">
            <ChangePassword />
          </div>
        )}
      </div>
    </div>
  );
};

export default NavTabs;
