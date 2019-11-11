import * as React from "react";
import { GameCellType, GameTurn } from "../../@types";
import { EmptyGameCell } from "./EmptyGameCell";
import { PlayerGameCell } from "./PlayerGameCell";
import { CPUGameCell } from "./CPUGameCell";

interface GameCellProps {
  type: GameCellType;
  turn: GameTurn;
  handleClick: () => void;
}

export const GameCell: React.FC<GameCellProps> = ({
  type,
  turn,
  handleClick
}) => {
  switch (type) {
    case GameCellType.Empty:
      return <EmptyGameCell handleClick={handleClick} turn={turn} />;
    case GameCellType.Player:
      return <PlayerGameCell />;
    default:
      return <CPUGameCell />;
  }
};
