"use client";
import { useState } from "react";
import Cta from "../common/Cta";
import CustomInput from "../common/CustomInput";
import CustomPopUP from "../common/CustomPopUP";
import ProfileDetailUpdate from "./ProfileDetailUpdate";

const ProfileDetail = () => {
  const [isNavBookNowVisible, setIsNavBookNowVisible] = useState(false);

  // State for profile details
  const [profileDetails, setProfileDetails] = useState({
    name: "",
    shopName: "",
    address: "",
  });

  const handleUpdate = (key: string, value: string) => {
    setProfileDetails((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="container max-w-[1172px] px-4">
      <div className="flex items-center justify-center flex-col">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <h2 className="w-28">User ID:</h2>
          <p className="px-4 py-1 w-60 border border-solid border-black rounded-lg text-lg leading-normal">
            123456789
          </p>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4">
          <label htmlFor="name" className="w-28">
            Name:
          </label>
          <CustomInput
            placeholder="Name"
            className="!py-1 w-60"
            disabled={true}
            value={profileDetails.name}
          />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4">
          <h2 className="w-28">Shop Name:</h2>
          <CustomInput
            placeholder="Shop Name"
            className="!py-1 w-60"
            disabled={true}
            value={profileDetails.shopName}
          />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4">
          <h2 className="w-28">Address:</h2>
          <CustomInput
            placeholder="Address"
            className="!py-1 w-60"
            disabled={true}
            value={profileDetails.address}
          />
        </div>
        <div className="mt-6">
          <Cta
            onClick={() => setIsNavBookNowVisible(!isNavBookNowVisible)}
            type="submit"
            className="text-white rounded"
          >
            Update Details
          </Cta>
        </div>
        <CustomPopUP
          isOpen={isNavBookNowVisible}
          onClose={() => setIsNavBookNowVisible(!isNavBookNowVisible)}
          className="max-w-[460px] w-64 sm:w-[440px]"
          onCloseClassName=""
        >
          <ProfileDetailUpdate
            onClick={() => setIsNavBookNowVisible(!isNavBookNowVisible)}
            profileDetails={profileDetails}
            handleUpdate={handleUpdate}
          />
        </CustomPopUP>
      </div>
    </div>
  );
};

export default ProfileDetail;
