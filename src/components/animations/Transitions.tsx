
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FadeTransitionProps {
  children: React.ReactNode;
  show: boolean;
  duration?: number;
  delay?: number;
}

export const FadeTransition: React.FC<FadeTransitionProps> = ({
  children,
  show,
  duration = 0.3,
  delay = 0,
}) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration, delay }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface SlideUpTransitionProps {
  children: React.ReactNode;
  delay?: number;
}

export const SlideUpTransition: React.FC<SlideUpTransitionProps> = ({
  children,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay, 
        ease: [0.22, 1, 0.36, 1] 
      }}
    >
      {children}
    </motion.div>
  );
};

interface StaggeredChildrenProps {
  children: React.ReactNode;
  staggerDelay?: number;
  containerClassName?: string;
}

export const StaggeredChildren: React.FC<StaggeredChildrenProps> = ({
  children,
  staggerDelay = 0.1,
  containerClassName = "",
}) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  // Clone children and add motion props
  const childrenWithMotion = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        ...child.props,
        variants: item,
      });
    }
    return child;
  });

  return (
    <motion.div
      className={containerClassName}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {childrenWithMotion}
    </motion.div>
  );
};
