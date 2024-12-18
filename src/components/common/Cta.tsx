import Link from "next/link";
import { ReactNode, MouseEventHandler } from "react";

interface CtaProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  transparent?: boolean;
  disabled?: boolean;
  url?: string;
  type?: "button" | "submit" | "reset";
  target?: "_self" | "_blank" | "_parent" | "_top";  // Define target types
  [key: string]: unknown;  // Allows additional props of any type
}

const Cta: React.FC<CtaProps> = ({
  children,
  onClick,
  className = "",
  transparent,
  url,
  disabled,
  type,
  target,
  ...props
}) => {
  const buttonType = {
    transparent: "bg-transparent border-white hover:bg-white/20",
    default: "bg-orange border-orange hover:bg-orange/70",
    common:
      "px-4 md:px-5 py-1 bg-black text-white rounded-lg text-sm md:text-base hover:bg-white hover:text-black border-2 border-black common-transition focus:outline-none",
  };

  return (
    <>
      {url ? (
        <Link
          target={target}
          href={url}
          {...props}
          className={`${className} ${transparent ? buttonType.transparent : buttonType.default} ${buttonType.common}`}
        >
          {children}
        </Link>
      ) : (
        <button
          disabled={disabled}
          onClick={onClick}
          type={type || "button"}
          {...props}
          className={`${className} ${transparent ? buttonType.transparent : buttonType.default} ${buttonType.common} ${
            disabled ? "cursor-not-allowed hover:bg-orange" : ""
          }`}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default Cta;
