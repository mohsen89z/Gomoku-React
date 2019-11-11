import * as React from "react";
import Box from "@material-ui/core/Box";

interface CenterProps {
  className?: string;
}

export const Center: React.FC<CenterProps> = props => (
  <Box display="flex" justifyContent="center" className={props.class}>
    {props.children}
  </Box>
);
