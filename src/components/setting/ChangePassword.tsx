"use client";
import { useState } from "react";
import CustomInput from "../common/CustomInput";
import Cta from "../common/Cta";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    userName: "",
    currentPassword: "", // Add currentPassword to form data
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    userName: "",
    currentPassword: "", // Add currentPassword error
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = { ...errors };
    if (!formData.currentPassword.trim()) {
      newErrors.currentPassword = "Current password is required.";
    }
    if (!formData.newPassword.trim()) {
      newErrors.newPassword = "New password is required.";
    }
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords must match.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
    }
  };

  return (
    <div className="container max-w-[1172px] px-4">
      <div className="flex items-center justify-center">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <label htmlFor="currentPassword" className="w-40">
                Current Password
              </label>
              <CustomInput
                id="currentPassword"
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Enter current password"
                error={errors.currentPassword}
                className="!py-1"
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <label htmlFor="newPassword" className="w-40">
                New Password
              </label>
              <CustomInput
                id="newPassword"
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                className="!py-1"
                error={errors.newPassword}
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <label htmlFor="confirmPassword" className="w-40">
                Confirm Password
              </label>
              <CustomInput
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                error={errors.confirmPassword}
                className="!py-1"
              />
            </div>
            <div className="text-center mt-6">
              <Cta type="submit" className="text-white rounded">
                Change Password
              </Cta>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
