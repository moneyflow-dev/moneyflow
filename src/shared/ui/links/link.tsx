import { ReactNode } from "react";
import {
  To,
  NavigateOptions,
  useNavigate,
  useLocation,
  useResolvedPath,
} from "react-router-dom";

export interface LinkProps extends NavigateOptions {
  to: To;
  className?: string | ((options: { isActive: boolean }) => string | undefined);
  children?: ReactNode | ((options: { isActive: boolean }) => ReactNode);
}

export const Link = ({ to, children, className, ...props }: LinkProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const toPathname = useResolvedPath(to, { relative: props.relative });
  const isActive = toPathname.pathname === location.pathname;

  const onClick = () => {
    navigate(to, props);
  };

  const resolvedClassName =
    typeof className === "function" ? className({ isActive }) : className;

  return (
    <div onClick={onClick} className={resolvedClassName}>
      {typeof children === "function" ? children({ isActive }) : children}
    </div>
  );
};
