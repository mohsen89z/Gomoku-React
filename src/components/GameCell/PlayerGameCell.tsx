import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Player from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles(() => ({
  base: {
    border: "1px solid #1E555C",
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    background: "#5AC18E"
  }
}));

interface PlayerGameCellProps {}
export const PlayerGameCell: React.FC<PlayerGameCellProps> = () => {
  const classes = useStyles({});
  return (
    <div className={classes.base}>
      <Player />
    </div>
  );
};
