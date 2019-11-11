import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { GameTurn } from "../../@types";

const useStyles = makeStyles(() => ({
  base: {
    border: "1px solid #1E555C",
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    background: "#BDD5EA"
  }
}));

interface EmptyGameCellProps {
  handleClick: () => void;
  turn: GameTurn;
}

export const EmptyGameCell: React.FC<EmptyGameCellProps> = ({
  turn,
  handleClick
}) => {
  const classes = useStyles({});
  return turn === GameTurn.Player ? (
    <Button onClick={handleClick} className={classes.base}>
      {" "}
    </Button>
  ) : (
    <div className={classes.base} />
  );
};
