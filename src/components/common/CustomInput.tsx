"use client";

type InputProps = {
  type?: string;
  name?: string;
  className?: string;
  id?: string;
  value?: string; 
  placeholder?: string;
  error?: string;
  showToggle?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTogglePasswordVisibility?: () => void;
  showPassword?: boolean;
  disabled?: boolean; 
};

const CustomInput: React.FC<InputProps> = ({
  type,
  name,
  value,
  placeholder,
  error,
  className,
  id,
  showToggle = false,
  onChange = () => {}, 
  onTogglePasswordVisibility,
  showPassword,
  disabled = false, 
}) => {
  return (
    <div className="flex flex-col relative">
      <div className="relative">
        <input
          type={type}
          name={name}
          id={id}
          value={value} 
          onChange={onChange} 
          placeholder={placeholder}
          disabled={disabled} 
          className={`px-4 py-3 w-full border border-solid border-black rounded-lg outline-none text-base leading-normal placeholder:text-black/50 ${className}`}
        />
        {showToggle && onTogglePasswordVisibility && (
          <button
            type="button"
            onClick={onTogglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm font-medium text-gray-600 focus:outline-none"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-1 absolute -bottom-4">{error}</p>
      )}
    </div>
  );
};

export default CustomInput;
