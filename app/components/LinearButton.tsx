import React, { ReactNode } from "react";

interface OptionType {
  label: string;
  value: string;
  icon: ReactNode;
}

interface LinearButtonType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  option: OptionType;
}

export const LinearButton = React.forwardRef<HTMLButtonElement, LinearButtonType>(
  ({ option, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className=" group h-6 w-fit flex items-center gap-1 border border-neutral-700 rounded px-2 py-0.5 text-xs font-light text-neutral-400 bg-neutral-800 hover:bg-neutral-700/60"
        {...props}
      >
        <div className="group-hover:text-neutral-50">
          {option.icon}
        </div>
       <p className="group-hover:text-white hidden md:block truncate max-w-[120px] overflow-hidden whitespace-nowrap">
          {option.label}
      </p>
      </button>
    );
  }
);

LinearButton.displayName = "LinearButton";
