interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={`bg-primary rounded-[20px] lg:w-[400px] md:w-[400px] sm:w-[350px] h-[65px] ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
