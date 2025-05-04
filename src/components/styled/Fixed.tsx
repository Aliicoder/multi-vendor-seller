import { motion, MotionProps } from 'framer-motion';
import { HTMLProps } from 'react';

interface IFixed extends MotionProps, Omit<HTMLProps<HTMLDivElement>, keyof MotionProps> {
  className?: string;
}

function Fixed({ className , children, ...props }: IFixed) {
  return (
    <motion.div className={`fixed ${className}`} {...props}>
      {children}
    </motion.div>
  );
}

export default Fixed;