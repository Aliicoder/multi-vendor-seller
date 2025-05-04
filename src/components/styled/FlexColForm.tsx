import { motion, MotionProps } from 'framer-motion';
import { HTMLProps,ReactNode, forwardRef } from 'react';

interface IFormProps extends MotionProps, Omit<HTMLProps<HTMLDivElement>, keyof MotionProps> {
  className?: string;
  children?: ReactNode
}

const FlexColForm = forwardRef<HTMLFormElement, IFormProps>(
  ({ children , className }, ref) => {
    return (
      <motion.form ref={ref} className={`flex flex-col ${className}`}  >
        {children}
      </motion.form>
    );
  }
);

export default FlexColForm;