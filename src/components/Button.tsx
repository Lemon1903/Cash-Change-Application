import React from "react";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  intent: "primary" | "secondary" | "dialog";
  text: string;
}

const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(
  ({ intent, text, ...props }, ref) => {
    const variants: { [key: string]: string } = {
      primary:
        "w-64 rounded-full py-4 bg-primary hover:bg-primary/80 sm:w-[342px] lg:text-4xl",
      secondary:
        "w-64 rounded-full py-4 bg-secondary hover:bg-secondary/80 sm:w-[342px] lg:text-4xl",
      dialog:
        "justify-self-end rounded-lg bg-primary px-6 py-2 text-lg md:text-2xl",
    };

    return (
      <button
        className={`text-center text-2xl font-medium uppercase text-input ${variants[intent]}`}
        ref={ref}
        {...props}
      >
        {text}
      </button>
    );
  }
);

export default Button;
