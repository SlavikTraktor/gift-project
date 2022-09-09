import { Autorenew } from "@mui/icons-material";
import cx from "classnames";

export interface LoaderProps {
  className?: string;
}

export const Loader = ({ className }: LoaderProps) => {
  return <Autorenew className={cx("animate-spin", className)} />;
};
