import { UseFormRegister } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  type: string;
  error?: string;
  register: UseFormRegister<Record<string, string>>;
  name: string;
  children?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  type,
  error,
  register,
  name,
  children,
  ...props
}) => {
  return (
    <div>
      <input
        {...props}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className="bg-[#F9F9F9] w-[100%] sm:w-[400px]  h-[55px] border-[#E0E0E9] border-2 rounded-md p-5 active:outline-primary focus:outline-primary focus:ring-1 focus:ring-[#122D9C] focus:ring-opacity-50"
      />
      {children}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
