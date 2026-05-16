import { Plus } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

export function AddButton({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex items-center gap-2 rounded-md bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors ${props.className ?? ""}`}
    >
      <Plus className="size-4" /> {children}
    </button>
  );
}
