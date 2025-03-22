
import React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  elevation?: "low" | "medium" | "high";
  interactive?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  elevation = "medium",
  interactive = false,
  ...props
}) => {
  const elevationStyles = {
    low: "shadow-sm backdrop-blur-sm bg-white/60 dark:bg-gray-900/40",
    medium: "shadow-md backdrop-blur-md bg-white/70 dark:bg-gray-900/50",
    high: "shadow-lg backdrop-blur-lg bg-white/80 dark:bg-gray-900/60",
  };
  
  return (
    <motion.div
      className={cn(
        "rounded-xl border border-white/20 dark:border-gray-800/50 p-5 overflow-hidden",
        elevationStyles[elevation],
        interactive && "hover:shadow-xl transition-shadow cursor-pointer",
        className
      )}
      whileHover={interactive ? { scale: 1.02 } : undefined}
      whileTap={interactive ? { scale: 0.98 } : undefined}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
