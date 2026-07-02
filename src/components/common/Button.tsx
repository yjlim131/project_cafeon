import { type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-colors tap-scale disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground shadow-card",
        secondary: "bg-surface-muted text-espresso-800",
        outline: "border border-border bg-surface text-espresso-800",
        ghost: "bg-transparent text-muted-foreground hover:text-foreground",
        destructive: "bg-terracotta-500 text-primary-foreground",
        ai: "bg-espresso-800 text-primary-foreground shadow-card",
      },
      size: {
        sm: "h-9 rounded-xl px-3 text-sm",
        md: "h-11 rounded-[14px] px-4 text-[15px]",
        lg: "min-h-[52px] rounded-2xl px-5 text-base",
        pill: "h-12 rounded-full px-5 text-[15px]",
        icon: "h-11 w-11 rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
