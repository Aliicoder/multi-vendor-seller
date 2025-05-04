import { forwardRef, PropsWithChildren } from "react";

interface ISticky extends PropsWithChildren {
  className?: string;
  onClick?: () => void;
}

const Sticky = forwardRef<HTMLDivElement, ISticky>(({ className = "", children, onClick }, ref) => {
  return (
    <div ref={ref} onClick={onClick} className={`sticky ${className}`}>
      {children}
    </div>
  );
});

export default Sticky;