import React from "react";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  intent: "primary" | "secondary" | "dialog";
  text: string;
}

const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(
  ({ intent, text, ...props }, ref) => {
    const variants: { [key: string]: string } = {
      primary:
        "w-[342px] rounded-full py-4 bg-primary text-4xl hover:bg-primary/80",
      secondary:
        "w-[342px] rounded-full py-4 bg-secondary text-4xl hover:bg-secondary/80",
      dialog: "justify-self-end rounded-lg bg-primary px-6 py-2 text-2xl",
    };

    return (
      <button
        className={`text-center font-medium uppercase text-input ${variants[intent]}`}
        ref={ref}
        {...props}
      >
        {text}
      </button>
    );
  }
);

export default Button;
