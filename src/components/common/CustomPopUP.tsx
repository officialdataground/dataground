import { useEffect, useState } from "react";
import Icons from "../icons/Icons";

interface PopupProps {
  isOpen: boolean;
  className?: string;
  onCloseClassName?: string;
  onClose: () => void;
  children: React.ReactNode;
}

const CustomPopUP: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  children,
  onCloseClassName,
  className,
}) => {
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    setVisible(isOpen);

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!visible) return null;

  return (
    <>
      <div
        className={`fixed inset-0 top-1/2 -translate-y-1/2 max-h-[90vh] p-4 sm:p-8 bg-white border-2 border-black rounded-md left-1/2 min-h-max -translate-x-1/2 overflow-y-auto popup-scrollbar z-[999]  ${className}`}
      >
        <div className="bg-white mx-auto z-30 relative">
          <span
            onClick={onClose}
            className={`absolute -top-2 -right-2 sm:-top-6 sm:-right-6 cursor-pointer z-50${onCloseClassName}`}
          >
            <Icons
              icon="plus"
              pathClass="fill-black"
              className="w-6 h-6 rotate-45"
            />
          </span>
          {children}
        </div>
      </div>
      <div
        onClick={onClose}
        className="bg-black/50 w-full h-screen fixed top-0 left-0 z-[998]"
      ></div>
    </>
  );
};

export default CustomPopUP;
