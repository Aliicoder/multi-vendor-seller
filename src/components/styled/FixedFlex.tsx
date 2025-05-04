import { motion, MotionProps } from 'framer-motion';
import { HTMLProps } from 'react';

interface IContainer extends MotionProps, Omit<HTMLProps<HTMLDivElement>, keyof MotionProps> {
  className?: string;
}

function FixedFlex({ className = "", children, ...props }: IContainer) {
  return (
    <motion.div className={`fixed flex ${className}`} {...props}>
      {children}
    </motion.div>
  );
}

export default FixedFlex;