"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Cta from "./common/Cta";
import EllipseImage from "../../public/assets/Images/webp/BigEllipse.webp";
import CustomInput from "./common/CustomInput";

type FormData = {
  username: string;
  password: string;
};

const LogIn = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.username.trim()) newErrors.username = "Username is required.";
    if (!formData.password.trim()) newErrors.password = "Password is required.";
    if (/\s/.test(formData.password))
      newErrors.password = "Password must not contain spaces.";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters long.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          const data = await response.json();
          alert(data.message);
          router.push("/homepage");
        } else {
          const error = await response.json();
          alert(error.message);
        }
      } catch (err) {
        console.error(err);
        alert("Something went wrong. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
  };
  

  return (
    <div className="relative min-h-screen">
      <Image
        className="absolute left-1/2 -translate-x-1/2 top-0 w-full h-40 sm:h-60 -z-10"
        width={1440}
        height={320}
        src={EllipseImage}
        alt="big-ellipse"
      />
      <h1 className="text-2xl sm:text-3xl lg:text-4xl text-white z-10 font-bold text-center w-full pt-14 sm:pt-20">
        Log In Your Account
      </h1>
      <div className="flex justify-center items-center h-[calc(100vh-88px)] sm:h-[calc(100vh-120px)] px-4 ">
        {loading ? (
          <div className="text-center">
            <p className="text-lg font-medium text-gray-700">Loading...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full max-w-[300px]">
            <div className="flex flex-col gap-5">
              <CustomInput
                type="text"
                name="username"
                value={formData.username}
                placeholder="Username"
                error={errors.username}
                onChange={handleChange}
              />
              <CustomInput
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                placeholder="Password"
                error={errors.password}
                showToggle={true}
                showPassword={showPassword}
                onChange={handleChange}
                onTogglePasswordVisibility={() =>
                  setShowPassword(!showPassword)
                }
              />
            </div>
            <div className="text-center mt-6">
              <Cta type="submit" className="py-2 px-4">
                Log In
              </Cta>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LogIn;
