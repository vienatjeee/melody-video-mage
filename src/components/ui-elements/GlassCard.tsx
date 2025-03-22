
import React from "react";
import { cn } from "@/lib/utils";
import { motion, MotionProps } from "framer-motion";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement>, MotionProps {
  children: React.ReactNode;
  className?: string;
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
    low: "shadow-sm",
    medium: "shadow-md",
    high: "shadow-lg",
  };
  
  return (
    <motion.div
      className={cn(
        "glass-card p-5 overflow-hidden",
        elevationStyles[elevation],
        interactive && "hover:shadow-xl transition-shadow cursor-pointer",
        className
      )}
      whileHover={interactive ? { scale: 1.02 } : {}}
      whileTap={interactive ? { scale: 0.98 } : {}}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
