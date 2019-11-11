import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CPU from "@material-ui/icons/Close";

const useStyles = makeStyles(() => ({
  base: {
    border: "1px solid #1E555C",
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    background: "#6CD4FF"
  }
}));

interface CPUGameCellProps {}
export const CPUGameCell: React.FC<CPUGameCellProps> = () => {
  const classes = useStyles({});
  return (
    <div className={classes.base}>
      <CPU />
    </div>
  );
};
