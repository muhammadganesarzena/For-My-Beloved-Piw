import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PaperSheetProps {
  children?: ReactNode;
  className?: string;
}

export function PaperSheet({ children, className }: PaperSheetProps) {
  return (
    <div className={cn("paper-surface h-full w-full", className)}>
      {children}
    </div>
  );
}
