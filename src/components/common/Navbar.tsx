"use client";
import Link from "next/link";
import Cta from "./Cta";
import { useCart } from "../CartProvider";
import Icons from "../icons/Icons";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const { clearCart, totalItems } = useCart();
  const router = useRouter();

  const handleLogout = () => {
    clearCart();
    router.push("/");
  };

  return (
    <div className="relative bg-rich-black z-40 bg-black/10">
      <nav className="container max-w-[1172px] px-4 flex items-center justify-between p-4 border-bottom-custom">
        <div className="flex items-center">
          <Link href="/homepage">
            <Icons icon="logo" className="w-14 h-14" />
          </Link>
        </div>
        <div className="flex gap-3 sm:gap-4 md:gap-5 items-center">
          <Cta
            url="/cartpage"
            className="!p-0 group hover:!bg-black/5 group h-9 w-9 flex items-center justify-center"
          >
            <div className="relative flex items-center justify-center">
              {totalItems > 0 ? (
                <span className="text-base font-semibold text-white group-hover:text-black">
                  {totalItems}
                </span>
              ) : (
                <Icons
                  className="w-6 h-6"
                  icon="cart"
                  pathClass="group-hover:!fill-black fill-white common-transition"
                />
              )}
            </div>
          </Cta>
          <Cta
            url="/settingpage"
            className="!p-0 group hover:!bg-black/5 group h-9 w-9 flex items-center justify-center"
          >
            <div className="relative flex items-center justify-center">
              <Icons
                className="w-6 h-6"
                icon="settingIcon"
                pathClass="group-hover:!fill-black fill-white common-transition"
              />
            </div>
          </Cta>
          <Cta
            onClick={handleLogout} // Trigger clearCart and logout logic
            aria-label="Log out button"
            className="flex text-white hover:!bg-black/5 common-transition px-3 md:px-5 h-9 items-center justify-center"
          >
            Log Out
          </Cta>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
