"use client";
import Cta from "../common/Cta";
import CustomInput from "../common/CustomInput";

type ProfileDetailUpdateProps = {
  onClick: () => void;
  profileDetails: {
    name: string;
    shopName: string;
    address: string;
  };
  handleUpdate: (key: string, value: string) => void;
};

const ProfileDetailUpdate = ({
  onClick,
  profileDetails,
  handleUpdate,
}: ProfileDetailUpdateProps) => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <label htmlFor="name" className="w-[120px]">
          Name
        </label>
        <CustomInput
          placeholder="Name"
          className="!py-1 w-56"
          id="name"
          value={profileDetails.name}
          onChange={(e) => handleUpdate("name", e.target.value)}
        />
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4">
        <label htmlFor="shopName" className="w-[120px]">
          Shop Name
        </label>
        <CustomInput
          placeholder="Shop Name"
          className="!py-1 w-56"
          id="shopName"
          value={profileDetails.shopName}
          onChange={(e) => handleUpdate("shopName", e.target.value)}
        />
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4">
        <label htmlFor="address" className="w-[120px]">
          Address
        </label>
        <CustomInput
          placeholder="Address"
          className="!py-1 w-56"
          id="address"
          value={profileDetails.address}
          onChange={(e) => handleUpdate("address", e.target.value)}
        />
      </div>
      <div className="mt-6">
        <Cta type="submit" className="text-white rounded" onClick={onClick}>
          Update
        </Cta>
      </div>
    </div>
  );
};

export default ProfileDetailUpdate;
